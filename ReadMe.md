# SandWhich

<img width="394" alt="Screen Shot 2023-11-13 at 3 41 54 PM" src="https://github.com/Sette94/phase-1-project-sandwhich/assets/147007475/f23ac41a-e3ad-4dd5-8516-0fddca63a0c4">

<img width="384" alt="Screen Shot 2023-11-13 at 3 42 07 PM" src="https://github.com/Sette94/phase-1-project-sandwhich/assets/147007475/9fc9dcb8-8661-430a-bc8f-33248198012f">

<img width="193" alt="Screen Shot 2023-11-13 at 3 42 23 PM" src="https://github.com/Sette94/phase-1-project-sandwhich/assets/147007475/e77a0b1e-c65d-4e49-a20d-afb44558f4ab">

## Description

Are you hungry for a sandwich but can't decide? SandWhich provides a selection of raw ingredients and suggests a sandwich based on those ingredients.

## Table of Contents

- [MVP](#MVP)
- [API/JSON](#API/JSON)
- [Challenges](#Challenges)
- [Kanban](#Kanban)

## MVP

Review the list of ingredients and select those which you would like on a sandwich. Each selection will render an image in an ingredients sidebar and the final suggestion on the main page. If a user selects "Cheese," an image for cheese will appear under the ingredients sidebar, as well as sandwiches such as a grilled cheese and a ham & cheese will appear on the main page.

## API/JSON

JSON file used with json-server: db.json


```
{
  "ingredients": [
    {
      "id": 1,
      "name": "Lettuce",
      "url": "https://example.com/lettuce.jpg"
    },
    {
      "id": 2,
      "name": "Tomato",
      "url": "https://example.com/tomato.jpg"
    },
    {
      "id": 3,
      "name": "Cheese",
      "url": "https://example.com/cheese.jpg"
    }
  ],
  "sandwiches": [
    {
      "id": 1,
      "name": "Ham and Cheese Sandwich",
      "ingredients": ["Ham", "Cheese", "Lettuce", "Tomato"],
      "url": "https://example.com/ham_and_cheese_sandwich.jpg"
    },
    {
      "id": 2,
      "name": "Turkey and Bacon Sandwich",
      "ingredients": ["Turkey", "Bacon", "Lettuce", "Tomato"],
      "url": "https://example.com/turkey_and_bacon_sandwich.jpg"
    },
    {
      "id": 3,
      "name": "Veggie Sandwich",
      "ingredients": ["Lettuce", "Tomato", "Cheese"],
      "url": "https://example.com/veggie_sandwich.jpg"
    }
  ]
}

```

## Challenges

1. Data collection
2. Combinations of sandwiches based on ingredients and providing enough default options.

## Kanban

[Kanban Board](https://trello.com/b/GtB1xzf0/sandwhich)
![SandWhich Kanban](https://github.com/Sette94/phase-1-project-sandwhich/assets/63803745/88272cdf-e0bb-4fdd-991f-d2134ddc6d96)


