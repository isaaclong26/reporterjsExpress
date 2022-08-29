
const fetch = require('node-fetch');

let url = 'https://solarinnovations.com/wp-json/gf/v2/entries?form_ids%5B0%5D=96';

let options = {
  method: 'GET',
  headers: {
    Cookie: 'identity-state=BAhbAA%3D%3D--db43e3715865ca03e3123219ec91e34189be9380; _ab=1; storefront_digest=cc0575cb8b30a9361e8a361bb5fb507d3e28a4fab6460445408eacbd744c4121; __ssid=0a710892-a739-454c-afc9-93cbd81a2855; secure_customer_sig=; localization=US; cart_currency=USD; _orig_referrer=; _landing_page=%2Fpages%2Fparamount-decking-faq; _y=263b52de-ebf1-40bb-af9d-1467cbba4d13; _shopify_y=263b52de-ebf1-40bb-af9d-1467cbba4d13; _tracking_consent=%7B%22lim%22%3A%5B%22GDPR%22%5D%2C%22con%22%3A%7B%22GDPR%22%3A%22%22%7D%2C%22v%22%3A%222.0%22%2C%22reg%22%3A%22%22%7D; _shopify_tw=; _shopify_m=persistent; _ga=GA1.3.784857764.1660568185; _gid=GA1.3.2062294796.1660568185; _fbp=fb.2.1660568185758.2001111498; shopify_pay_redirect=pending; _pin_unauth=dWlkPVlUa3lNelV3TlRndE1UY3dZUzAwWmpNNUxUazNPRE10TmpRelpHWTRNMll5WWpWbQ; _gcl_au=1.1.704464000.1660568186; __hstc=135743086.12a810375472737bd4be8b8634f7349b.1660568187045.1660568187045.1660568187045.1; hubspotutk=12a810375472737bd4be8b8634f7349b; __hssrc=1; locale_bar_accepted=1; _s=355ebd3f-e637-4613-a652-9864f652cb96; _shopify_s=355ebd3f-e637-4613-a652-9864f652cb96; _shopify_tm=; _dd_s=',
    Authorization: 'Basic Y2tfMDQ4MDljYzRmYjE3NDczMDlhZDY3ODhkZGUwYmQyYmNkZGNlZWZjYzpjc18zNTU0ZWZlZTgxYTI1ZTFjMGRhMmMzMTIyYzVjNjUzYmUzZWNkOTZm'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));