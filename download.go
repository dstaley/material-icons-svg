package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
)

type Icon struct {
	Id        string            `json:"id"`
	ImageUrls map[string]string `json:"imageUrls"`
}

type Category struct {
	Icons []Icon `json:"icons"`
	Name  string `json:"name"`
}

type IconListing struct {
	BaseUrl    string     `json:"baseUrl"`
	Categories []Category `json:"categories"`
}

func GetIconListing() (IconListing, error) {
	res, err := http.Get("https://material.io/tools/icons/static/data.json")
	if err != nil {
		return IconListing{}, err
	}
	defer res.Body.Close()

	var iconListing IconListing
	err = json.NewDecoder(res.Body).Decode(&iconListing)
	if err != nil {
		return IconListing{}, err
	}

	return iconListing, nil
}

func DownloadIcon(iconUrl string, filename string) {
	out, err := os.Create(fmt.Sprintf("icons/%s", filename))
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()

	res, err := http.Get(iconUrl)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	_, err = io.Copy(out, res.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(iconUrl)
}

func main() {
	variants := []string{"baseline", "outline", "round", "twotone", "sharp"}
	iconListing, err := GetIconListing()
	if err != nil {
		log.Fatal(err)
	}

	var wg sync.WaitGroup

	iconEndpoint := fmt.Sprintf("https://material.io/tools/icons/%s", iconListing.BaseUrl)
	for _, category := range iconListing.Categories {
		for _, icon := range category.Icons {
			for _, variant := range variants {
				wg.Add(1)

				var filename string
				if len(icon.ImageUrls) != 0 {
					filename = icon.ImageUrls[variant]
				} else {
					filename = fmt.Sprintf("%s-%s-24px.svg", variant, icon.Id)
				}

				iconUrl := fmt.Sprintf("%s%s", iconEndpoint, filename)

				go func(iconUrl string, filename string) {
					defer wg.Done()

					DownloadIcon(iconUrl, filename)
				}(iconUrl, filename)
			}
		}
	}

	wg.Wait()
}
