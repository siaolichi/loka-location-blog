import icon1 from "@/assets/icons/icon-1.png";
import icon2 from "@/assets/icons/icon-2.png";
import icon3 from "@/assets/icons/icon-3.png";
import icon4 from "@/assets/icons/icon-4.png";
import icon5 from "@/assets/icons/icon-5.png";
import icon6 from "@/assets/icons/icon-6.png";
import icon7 from "@/assets/icons/icon-7.png";
import icon8 from "@/assets/icons/icon-8.png";
import icon9 from "@/assets/icons/icon-9.png";

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9];

export function initMap(mapRef) {
  const google = window.google;
  const map = new google.maps.Map(mapRef.value, {
    zoom: 6,
  });

  const service = new google.maps.places.PlacesService(map);

  return { service, map };
}

export async function getDetailByPlaceId(service, place) {
  return new Promise(async (resolve, reject) => {
    try {
      service.getDetails(
        { placeId: place.id, field: ["name", "formatted_address", "geometry", "photo", "place_id"] },
        (placeDetail, status) => {
          if (placeDetail) {
            const address = placeDetail.formatted_address;
            let photo;
            if (placeDetail.photos) photo = placeDetail.photos[0].getUrl();
            return resolve({ ...place, ...placeDetail, address, photo });
          } else {
            return reject(status);
          }
        }
      );
    } catch (error) {
      return reject(error);
    }
  });
}

export async function getDetailByPlaceIds(service, placeIds) {
  try {
    if (!placeIds || !service) return [];
    const placeDetails = [];
    for (let i = 0; i < placeIds.length; i++) {
      try {
        const place = await getDetailByPlaceId(service, placeIds[i]);
        placeDetails.push(place);
      } catch (error) {
        console.log(error);
      }
    }
    return placeDetails;
  } catch (error) {
    console.log(error);
  }
}

let lastInfoWindow;
let markers = {};

export function addMarkers(map, locations) {
  const google = window.google;
  let markers = {};
  locations.forEach((place, i) => {
    const contentString = `<div style="padding: 10px; font-family: 'Libre Bodoni', 'Noto Serif TC', serif">
      <h1 style="margin: 10px 0; font-weight: 800">
      ${place.title}
      </h1>
      <hr style="width: 100%; margin-left: 10px; border: none; border-top: solid #f2f8ff 20px; transform: translateY(-20px); z-index: -1;"/>
      <div id="photo">
      <img src="${place.photo}" style="width: 100%; max-width: 400px; margin: 10px 0;"/>
      </div>
      <div>
      <a href="${place.url}" target="_blank" style="font-weight: 800; color: black; margin: 10px 0">open in google map</a>
      </div>
      </div>`;

    google.maps.event.addListener(map, "click", function () {
      infowindow.close();
    });

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    markers[place.id] = new google.maps.Marker({
      position: place?.geometry?.location,
      map,
      // label: {
      //   text: "\ue530", // codepoint from https://fonts.google.com/icons
      //   fontFamily: "Material Icons",
      //   color: "#ffffff",
      //   fontSize: "18px",
      // },
      title: place.name,
      photo: place.photo,
      city: place.city,
      icon: icons[i],
    });

    markers[place.id].addListener("click", () => {
      if (lastInfoWindow) {
        lastInfoWindow.close({
          anchor: markers[place.id],
          map,
        });
      }

      const liraryCloseButton = document.querySelector("#map-section__close-library");
      if (liraryCloseButton) {
        liraryCloseButton.parentElement.click();
      }
      infowindow.open({
        anchor: markers[place.id],
        map,
        shouldFocus: true,
        maxWidth: "500px",
      });

      lastInfoWindow = infowindow;
    });
  });

  return markers;
}
