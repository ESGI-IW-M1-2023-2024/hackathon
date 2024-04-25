import { Region } from "./region.types";

export interface Wine {
    id: number;
    label: string;
    productYear: number;
    producer: string;
    grapeVariety: string;
    alcoholLevel: number;
    color: string;
    quantity: number;
    bottleSize: string;
    comments: string;
    region: Region;
    servingTemperature: string;
    storage: string;
    upTo: string;
    taste: string;
    byTaste: string;
    byEye: string;
    onTheNose: string;
    inTheMouth: string;
    winePairing: string;
    recommandedPairing: string;
    content: string;
    imageFilename: string;
    archived: boolean;


}

/* 
 retour API :

 {
  "id": 181,
  "label": "Voluptatem et et velit ut delectus autem. Debitis veritatis voluptas quis corrupti architecto voluptatem. Tempora sed maiores quia fugit adipisci incidunt.",
  "productYear": 1972,
  "producer": "Emily Spinka",
  "grapeVariety": "Veritatis vitae sint at suscipit voluptatem amet. Possimus ad ea quod et numquam non qui eaque. Esse porro sint sint ab. Voluptatum dolor aut officiis ad non dolores nam.",
  "alcoholLevel": 15.3505818,
  "color": "#5ace07",
  "quantity": 5076,
  "bottleSize": "standard",
  "comments": "Sed ut qui nihil dolorem consequatur. Aut voluptatem veritatis ullam iste. Est sapiente velit distinctio eveniet similique.",
  "region": {
    "id": 573,
    "label": "Iusto in.",
    "country": "LU",
    "archived": false,
    "countryName": "Luxembourg"
  },
  "servingTemperature": null,
  "storage": null,
  "upTo": null,
  "taste": null,
  "byTaste": null,
  "byEye": null,
  "onTheNose": null,
  "inTheMouth": null,
  "winePairing": null,
  "recommandedPairing": null,
  "content": null,
  "imageFilename": null,
  "archived": false
}
*/