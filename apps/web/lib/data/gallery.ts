/**
 * Real Studio outputs used as on-site examples. Generated from ComfyUI output
 * (each image classified by its embedded workflow metadata), optimized to WebP
 * with a tiny inline blur placeholder for smooth loading. See scripts in the PR.
 */

export type Example = { src: string; w: number; h: number; blur: string };
export type StyleGallery = { id: string; name: string; examples: Example[] };

export const styleGalleries: StyleGallery[] = [
  { id: "none", name: "No style", examples: [
    { src: "/studio/examples/none-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAAAQBQCdASoUABQAPwF2slOrJySiqAgBYCAJYwCAAAMvMCnVXzcmtI4167brXDeaIp+AAPuabEbEGpU54mMjWUM88OXByrHlLVuKtmVysePTAv1nEJwfw/Dlkox9nNCx59y58EPNMwWJvrfMGhcTUcx5o1WNGy4M3MCm+leacpYlO3uknNyBVVQZIcd4UzSG0kciIXRIlsl51npbwGb82kiPEmmO2IgA" },
    { src: "/studio/examples/none-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABQBQCdASoUABQAPwF4tFOrJyUiqAgBYCAJQBOmau3/wDcBQ47PoXJalQOXbHkOYfRY0QAA/oXTV2B0UMNt/EWMw82yHIStDODpalB2fetigrjURwhSmyIocWuFvpsgP6SK3yLQwxUMvzXjPG7UlxHVSqC7GJTDIb2b4c/0XIo19eVRyYYJvFH57FACbzn8Yf1WX+/MOypkhSRkbYqg1J0duFuZpT4buKcMzSN8Sz6Y4KCR1dZdWxYrpMXMROAA" },
  ] },
  { id: "sunset-blur", name: "Sunset Blur", examples: [
    { src: "/studio/examples/sunset-blur-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAABwBACdASoUABQAPwFwsVIrJiSiqAqpYCAJaAC7Mt8BRW6RSKFFOfRFEQRLQADKqbzOnSVp/3yXTLhcTzRX4QZX8RuRmKxshLbYTOdjso2tdCDfUT6xMvyRtFetEgdG9IboxDXYgs0rwyorxh+0JL/OV+Vzl0890MzS23V9osGM6AAA" },
    { src: "/studio/examples/sunset-blur-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAAAwBQCdASoUABQAPwF2slOrJySiqAgBYCAJZACdMuiBqfOa+s0IXqcGmjpj2aFvgHhEAAD+i3qeOxoZszKjiB2wFlCbJAxulyLauVgfNGL0IDB4blxJRqBvnMjMBGHJqBk9VfmSaRL8LfDfUPuF62VIQRoZG4KTsFdRVyoz0jwWMGLvsgRc/yp1ZwamyxG4AAA=" },
  ] },
  { id: "soft-watercolor", name: "Soft Watercolor", examples: [
    { src: "/studio/examples/soft-watercolor-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAAAQBQCdASoUABQAPwF2slOrJySiqAgBYCAJQBdkKNAwjPkKqMNWCcVRkZs0LEdOqqmwAP7TTX5PblrPmmJQeMHssJWtD3vrnWz5TqJZn1K820EdMWueUfjxc7erXiS6Njvd27+la7Thea65UF9j6KcMvOQprQsO5dziEqNZmbj3QghtMTTKM4fms5IcYUUduSTF0E5xlvYxH5dNmqGdOPk08iml1ukvQwZF1AAA" },
    { src: "/studio/examples/soft-watercolor-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAADQBACdASoUABQAPwF2s1OrJySiqAgBYCAJQBTmps8Mgcv0lAVNAnD+lEPZ0RAMAAD9mYEqQRBpmgCrnhbphKYKLXvrnAeXsZ8mpjgD5CrduWzP6kl77toF9fKStka2OTmC89w2UVCV3EktxxwgCdCTn7hR7qxZ5sejGFOevzSFaONWqHtFVWO6hpzExzJffE6FJJx53iQalPuqbau0347QAuEE7ac6sAAAAA==" },
  ] },
  { id: "retro-anime", name: "Retro Anime", examples: [
    { src: "/studio/examples/retro-anime-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoUABQAPwF0rlKrJqQiqAqpYCAJZAC7B3gAL04QxUWOLbZaZxM3+e1tgABeiB/OVEgvRODF84iA3akId/j0R/rg1Fuu7LUk0oy+I8ha4LCo0lamY37QiWcH9xktgtXWc5O5JsagFh656gGUGBayDSCeYKplDN0BWqnshLg7Nqb6rW1nPmLCtTRsIEXclbCRwi67jrmR4gA=" },
    { src: "/studio/examples/retro-anime-2.webp", w: 795, h: 1200, blur: "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBACdASoNABQAPwFqrE8rJaQiMAgBYCAJbACdACHaDXAmZq1G0/kJDUAA/ujMfOECRz8v566TDi9DCEnFXHzkzGn3NMLSanw9DefguiUDL33diG71Pp0pFJL6S8cuvpn7sJaipXwNNZpofRZyMOR5egtNpmWuPNEvpfbwtAeBCfNhBk+mAA==" },
  ] },
  { id: "neon-drip", name: "Neon Drip", examples: [
    { src: "/studio/examples/neon-drip-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAAAQBQCdASoUABQAPwF2s1OrJySiqAgBYCAJQBYdgjLlYIOj/oZR75797iYnOw/qcG9AAP2ao2ubCVyUlA07lKQ2IOrPSKtVNyrL7ElbyoSTxCeaH+if+eIGZYEqNtJFK5WeE5mqtYNsM6Zbl+7a2hSWbmnFZOijgipCjAwLEk4TitNqTpn6lMqIDiB4gvAgtbbpavyS7D9iRU4j+yyq+VMccGEDAAAA" },
    { src: "/studio/examples/neon-drip-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAADQBACdASoUABQAPwF4tFOrJyUiqAgBYCAJZgCzjiAAE/vEn8BedXcBkzn/ItYqAAD3JOT8hWbeQsSwkPV8O0TqBu0ErjM/EOCWhxzONd6lTAVR9qpmfqoehWq1Upy0Lx3xC1vWNxMttSv/b72hp4nq52Zkpik3WR1dYAxZuxKBJxHZJs819PO/p+g0V/EHlO/m+PL7YwHSKEZqpKGlIXo3AAA=" },
  ] },
  { id: "warm-pastel", name: "Warm Pastel", examples: [
    { src: "/studio/examples/warm-pastel-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACQBACdASoUABQAPwF2slOrJyQiqAgBYCAJQBYdgiORanaUYxkCknCOoG9vmQAA/ouXe65CQw7rAJiYAHPBOa4X9EwHJKyaXP3fe3Awnz156Gi9U2zXzRX0BJhPko5vCzsol1dtWB6TB3swAdSSPI0iQ0hHzKOIkNWPhubVpnoopy4vcdUERnxtwKeRAAAA" },
    { src: "/studio/examples/warm-pastel-2.webp", w: 1008, h: 1008, blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAwCdASoUABQAPwFosFGrJSSjsBgIAWAgCUek4AEye+PoAzlzgH4AAP7qTcci+w8tNMlVz6Kdu41pZjf+JsgnxUDp0FC79B8XL/q0mjsiGxe+Ci+NbmyYkTMp93WQZEI/GdHcPIEpoZpl+AA=" },
  ] },
  { id: "dark-brush", name: "Dark Brush", examples: [
    { src: "/studio/examples/dark-brush-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRtQAAABXRUJQVlA4IMgAAAAwBQCdASoUABQAPwF2slOrJySiqAgBYCAJZwAD5RC2iAd7fPIwN7bCE9Dfn4z6p6T7XAD+6GBDjOW24ICpNT+AsieJhNIGGbfox5agNPoMCxX1i2oTzJ0U1jJLkfPFcU0IEvGB8nfePU11qcSRi3g6VtnTjlQAKqnsMRqQx0+4+9PvwZUpMX/m4pmAv2i+z5v9tJsCXfj2igXDVF9fFxnFs+dSnycHmZnJMfZG8K9u28jwWcFVBmLT43nKNqccS0YVPH3UkAAAAA==" },
    { src: "/studio/examples/dark-brush-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABwBQCdASoUABQAPwF2s1OrJySiqAgBYCAJaQAIEC6Jy8t34pAh+5/pPIdVPsAdtVZkkg2QAP7XcEoFgM4Rlh7zY+0IgNFtsTPEQohHjS9QF0/7Due4FxZC/PD3ro4/yASe5IV+hAicdsNnM+xbh9USG8lv0Ak4SsKQ9h8Izx2/kpmnwi4cSwJ8cbXmcamIp5QgvQqKeNrWa7bBcTXehP+nFZF6/i1lnpwI4rifo9pTPttKPQGKJo7AlycxAEAA" },
  ] },
  { id: "dot-matrix", name: "Dot Matrix", examples: [
    { src: "/studio/examples/dot-matrix-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwBACdASoUABQAPwF2s1OrJySiqAgBYCAJZwC7Ay6onzPhbCXX3wftgrBIqNxfDwAA/udAqcyyrwTZLNkqOIFeHKBZkiH76bVU9ygQO+K3ZquIdij0vHO1bitGN7ppJZj5yTPVkcfoW9YKCvV/RoViVGIbuft0l+mX8LQAAAA=" },
    { src: "/studio/examples/dot-matrix-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAACwBACdASoUABQAPu1urlIppiQiqAgBMB2JZwAu/8A8+rdvgewwIPh+6iWdiv+QAP37AfDkqNmCmEwqDPsgOM3ZlZn8AFQKAa4xKN+7VcgKOSZDN747MZrSGBys3NCWMW1YgBK2z35rh1HddqbyAVUxIw9DKaT4RNKnMd2RvxcIWgx9nnrRipvnhtxttBH+fey7TdAw1jvZc6/SFKAAAA==" },
  ] },
  { id: "kids-drawing", name: "Kids' Drawing", examples: [
    { src: "/studio/examples/kids-drawing-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAABwBQCdASoUABQAPwF0sVOrJqQiqAgBYCAJZAC7AYuQZE7wWcsL1gdoJ0J8qKVyz0STw7lAAP7rfD7t1j6lz7tHzzY6kQCc7OqADp4PeVVgNZtYa9yL7V6xUvhZUTt5r0o6vFVsIcSaAC3u0vHGUsAmUFcxvVpOc3eZ8ulyRAQnV30eafgGURjClzMudoWyCgyxtt6fUEgdvCD7/6duiPhdfvrdhJvT8Vx85iJTsW18WBM4WRKUgWofRB5Q4JYe3KRqdtMyIBe3GIAA" },
    { src: "/studio/examples/kids-drawing-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAADwBACdASoUABQAPwF2slOrJySiqAgBYCAJYgDNwdwLfIOCxBV1fFGLuDv93rRzv4AA/u1HJWj4Fld4hx9KNBkB2ZvWsv/J2qogAXp2UArnkUxNkas10EPwesp/i0dI4hDHf0xwFacEGNwaU4/0SIej0+7LPPscgt2+Gtu4mqEaTmtVCi8vqNJz3g1elkn4t7PMRz8+J3/YaxO9dEJf42y/1yuSxKtxbzg5JI4IAAA=" },
  ] },
  { id: "rainy-window", name: "Rainy Window", examples: [
    { src: "/studio/examples/rainy-window-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAACwBACdASoUABQAPwFyrFGrJqOiqA1RYCAJYwC7AAryf+Wz4uFA9kQu9bXTOvwAAP6gbt31zAtjetcrFCTojm1VIjuK57HZAGI1gNfk/csnfsTyT/LvFb9Cd0RlKPr9aXbmZ/GjkSFRc38J7MaPNw+dMkXY6uaJjaxVEOwrpEYY0ojR37KexWdCiSnYG17OHW2NY2MaLPCeozIBQlAAAA==" },
    { src: "/studio/examples/rainy-window-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAADQBACdASoUABQAPwF2s1OrJySiqAgBYCAJbAC06A1EQ2QUiPHPEHU0YGdSjX5DgAD50z159lMgC6QB0lsNeHhNJaSBLjx56bCnMXweOlU5BfCbLkuLkOHpsrTIfYycKK9WGde+SsHvwTMxi4GaDoOTDcG8MkxB2SPrqP8xJs4+NxjkrVcGZUdbCFBaBKZoAAA=" },
  ] },
  { id: "vintage-tarot", name: "Vintage Tarot", examples: [
    { src: "/studio/examples/vintage-tarot-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAABQBQCdASoUABQAPwF4tFOrJyUiqAgBYCAJbAC/OYyycNYN1CUbtoCU+uwmlBocpzna2EAA/nfwqv8zvjR5/yAR9zXNAjf6mbuHk9IgWxp/3++jy6FOtxH5Ho8wyDPg07EEjrOTclYXnPlqE3Lg1Yj5Rxvsra+wyKtdeFC7Z1HQf74k4ZKA55sQCbSvtVvh/VAvfQaJrqQbq0ZDqXgV3mKxoDca5AaRuWuyak8rOZr4DvIAAAA=" },
    { src: "/studio/examples/vintage-tarot-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAADQBACdASoUABQAPwF2s1OrJySiqAgBYCAJYwC7AA5LYVjGzRJOEQdSM035qkuRgAD+0d0jYUxg1Gk7+CME8iXgocyXA5AHuEUoPqwqX2iOI6fNDHUU+UlPAthzgN9PZv2qy/ANBKSoBSLDwTm4e6uIj1Tp7hkGvon+N3xFAXhonoul33eENDyEe1L4vBn9rZRlOQ9Er6tDVIC8SKu8QBUAAAA=" },
  ] },
];

/** A curated, mixed strip for the homepage showcase. */
export const showcase: (Example & { style: string })[] = [
  { ...{ src: "/studio/examples/sunset-blur-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAAAwBQCdASoUABQAPwF2slOrJySiqAgBYCAJZACdMuiBqfOa+s0IXqcGmjpj2aFvgHhEAAD+i3qeOxoZszKjiB2wFlCbJAxulyLauVgfNGL0IDB4blxJRqBvnMjMBGHJqBk9VfmSaRL8LfDfUPuF62VIQRoZG4KTsFdRVyoz0jwWMGLvsgRc/yp1ZwamyxG4AAA=" }, style: "Sunset Blur" },
  { ...{ src: "/studio/examples/retro-anime-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoUABQAPwF0rlKrJqQiqAqpYCAJZAC7B3gAL04QxUWOLbZaZxM3+e1tgABeiB/OVEgvRODF84iA3akId/j0R/rg1Fuu7LUk0oy+I8ha4LCo0lamY37QiWcH9xktgtXWc5O5JsagFh656gGUGBayDSCeYKplDN0BWqnshLg7Nqb6rW1nPmLCtTRsIEXclbCRwi67jrmR4gA=" }, style: "Retro Anime" },
  { ...{ src: "/studio/examples/vintage-tarot-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAABQBQCdASoUABQAPwF4tFOrJyUiqAgBYCAJbAC/OYyycNYN1CUbtoCU+uwmlBocpzna2EAA/nfwqv8zvjR5/yAR9zXNAjf6mbuHk9IgWxp/3++jy6FOtxH5Ho8wyDPg07EEjrOTclYXnPlqE3Lg1Yj5Rxvsra+wyKtdeFC7Z1HQf74k4ZKA55sQCbSvtVvh/VAvfQaJrqQbq0ZDqXgV3mKxoDca5AaRuWuyak8rOZr4DvIAAAA=" }, style: "Vintage Tarot" },
  { ...{ src: "/studio/examples/dark-brush-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRtQAAABXRUJQVlA4IMgAAAAwBQCdASoUABQAPwF2slOrJySiqAgBYCAJZwAD5RC2iAd7fPIwN7bCE9Dfn4z6p6T7XAD+6GBDjOW24ICpNT+AsieJhNIGGbfox5agNPoMCxX1i2oTzJ0U1jJLkfPFcU0IEvGB8nfePU11qcSRi3g6VtnTjlQAKqnsMRqQx0+4+9PvwZUpMX/m4pmAv2i+z5v9tJsCXfj2igXDVF9fFxnFs+dSnycHmZnJMfZG8K9u28jwWcFVBmLT43nKNqccS0YVPH3UkAAAAA==" }, style: "Dark Brush" },
  { ...{ src: "/studio/examples/neon-drip-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAAAQBQCdASoUABQAPwF2s1OrJySiqAgBYCAJQBYdgjLlYIOj/oZR75797iYnOw/qcG9AAP2ao2ubCVyUlA07lKQ2IOrPSKtVNyrL7ElbyoSTxCeaH+if+eIGZYEqNtJFK5WeE5mqtYNsM6Zbl+7a2hSWbmnFZOijgipCjAwLEk4TitNqTpn6lMqIDiB4gvAgtbbpavyS7D9iRU4j+yyq+VMccGEDAAAA" }, style: "Neon Drip" },
  { ...{ src: "/studio/examples/kids-drawing-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAABwBQCdASoUABQAPwF0sVOrJqQiqAgBYCAJZAC7AYuQZE7wWcsL1gdoJ0J8qKVyz0STw7lAAP7rfD7t1j6lz7tHzzY6kQCc7OqADp4PeVVgNZtYa9yL7V6xUvhZUTt5r0o6vFVsIcSaAC3u0vHGUsAmUFcxvVpOc3eZ8ulyRAQnV30eafgGURjClzMudoWyCgyxtt6fUEgdvCD7/6duiPhdfvrdhJvT8Vx85iJTsW18WBM4WRKUgWofRB5Q4JYe3KRqdtMyIBe3GIAA" }, style: "Kids' Drawing" },
  { ...{ src: "/studio/examples/warm-pastel-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACQBACdASoUABQAPwF2slOrJyQiqAgBYCAJQBYdgiORanaUYxkCknCOoG9vmQAA/ouXe65CQw7rAJiYAHPBOa4X9EwHJKyaXP3fe3Awnz156Gi9U2zXzRX0BJhPko5vCzsol1dtWB6TB3swAdSSPI0iQ0hHzKOIkNWPhubVpnoopy4vcdUERnxtwKeRAAAA" }, style: "Warm Pastel" },
  { ...{ src: "/studio/examples/dot-matrix-1.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwBACdASoUABQAPwF2s1OrJySiqAgBYCAJZwC7Ay6onzPhbCXX3wftgrBIqNxfDwAA/udAqcyyrwTZLNkqOIFeHKBZkiH76bVU9ygQO+K3ZquIdij0vHO1bitGN7ppJZj5yTPVkcfoW9YKCvV/RoViVGIbuft0l+mX8LQAAAA=" }, style: "Dot Matrix" },
  { ...{ src: "/studio/examples/soft-watercolor-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAADQBACdASoUABQAPwF2s1OrJySiqAgBYCAJQBTmps8Mgcv0lAVNAnD+lEPZ0RAMAAD9mYEqQRBpmgCrnhbphKYKLXvrnAeXsZ8mpjgD5CrduWzP6kl77toF9fKStka2OTmC89w2UVCV3EktxxwgCdCTn7hR7qxZ5sejGFOevzSFaONWqHtFVWO6hpzExzJffE6FJJx53iQalPuqbau0347QAuEE7ac6sAAAAA==" }, style: "Soft Watercolor" },
  { ...{ src: "/studio/examples/rainy-window-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAADQBACdASoUABQAPwF2s1OrJySiqAgBYCAJbAC06A1EQ2QUiPHPEHU0YGdSjX5DgAD50z159lMgC6QB0lsNeHhNJaSBLjx56bCnMXweOlU5BfCbLkuLkOHpsrTIfYycKK9WGde+SsHvwTMxi4GaDoOTDcG8MkxB2SPrqP8xJs4+NxjkrVcGZUdbCFBaBKZoAAA=" }, style: "Rainy Window" },
  { ...{ src: "/studio/examples/none-2.webp", w: 1024, h: 1024, blur: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABQBQCdASoUABQAPwF4tFOrJyUiqAgBYCAJQBOmau3/wDcBQ47PoXJalQOXbHkOYfRY0QAA/oXTV2B0UMNt/EWMw82yHIStDODpalB2fetigrjURwhSmyIocWuFvpsgP6SK3yLQwxUMvzXjPG7UlxHVSqC7GJTDIb2b4c/0XIo19eVRyYYJvFH57FACbzn8Yf1WX+/MOypkhSRkbYqg1J0duFuZpT4buKcMzSN8Sz6Y4KCR1dZdWxYrpMXMROAA" }, style: "No style" },
  { ...{ src: "/studio/examples/retro-anime-2.webp", w: 795, h: 1200, blur: "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBACdASoNABQAPwFqrE8rJaQiMAgBYCAJbACdACHaDXAmZq1G0/kJDUAA/ujMfOECRz8v566TDi9DCEnFXHzkzGn3NMLSanw9DefguiUDL33diG71Pp0pFJL6S8cuvpn7sJaipXwNNZpofRZyMOR5egtNpmWuPNEvpfbwtAeBCfNhBk+mAA==" }, style: "Retro Anime" },
];
