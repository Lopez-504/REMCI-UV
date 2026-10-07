// UPDATED
export const articles = [
  {
    id: 1,

    // -------------------------
    // CATALOGUE INFORMATION
    // -------------------------
    title: "Clouds",
    category: "basics",
    readTime: "5 min",

    image1: "images/learning/clouds1.jpeg",
    image2: "images/learning/clouds2.jpeg",

    summary:
      "Learn what clouds are, how they form, and why their appearance can tell us so much about the atmosphere.",

    // -------------------------
    // ARTICLE CONTENT
    // -------------------------
    articleTitle: "Clouds: The Visible Atmosphere",

    subtitle:
      "Understanding how temperature, humidity, and atmospheric motion shape the clouds we see.",

    introduction: [
      "Clouds are one of the most familiar features of the atmosphere, but they are also one of the most useful. Their shape, height, and evolution contain information about temperature, humidity, stability, and vertical motion.",
      "Although clouds can look very different from one another, they all begin with the same basic process: water vapor in the atmosphere condenses into tiny liquid droplets or ice crystals."
    ],

    sections: [
      {
        id: "formation",
        title: "How do clouds form?",

        paragraphs: [
          "Air can contain water vapor, but the amount of vapor it can hold depends strongly on temperature. Warmer air can contain more water vapor than colder air.",
          "When air rises, it expands and cools. If it cools enough, the air eventually reaches saturation. Water vapor can then begin to condense onto tiny particles known as cloud condensation nuclei.",
          "The resulting microscopic droplets or ice crystals scatter sunlight, making the cloud visible to us."
        ],

        image: "/images/learning/cloud-formation.jpeg",

        caption:
          "A simplified representation of cloud formation as moist air rises and cools."
      },

      {
        id: "types",
        title: "Different types of clouds",

        paragraphs: [
          "Clouds are classified according to their appearance and altitude. Some clouds form close to the surface, while others can extend several kilometers into the atmosphere.",
          "Cumulus clouds often have a distinct, vertically developed appearance and are commonly associated with convection. Stratus clouds, in contrast, tend to form broad and relatively uniform layers.",
          "High-altitude cirrus clouds are primarily composed of ice crystals and often have a thin, fibrous appearance."
        ],

        image: "/images/learning/cloud-types.jpeg",

        caption:
          "Examples of different cloud forms and their typical atmospheric environments."
      },

      {
        id: "weather",
        title: "What can clouds tell us about the weather?",

        paragraphs: [
          "Clouds are more than passive features of the sky. Their development can provide clues about what is happening within the atmosphere.",
          "Rapidly growing cumulus clouds, for example, can indicate strong upward motion and atmospheric instability. Thickening high clouds may sometimes signal the approach of a frontal system.",
          "By observing clouds together with measurements of temperature, humidity, pressure, and wind, meteorologists can build a much better picture of atmospheric conditions."
        ]
      }
    ],

    // -------------------------
    // ARTICLE CONCLUSION
    // -------------------------
    conclusion: [
      "Clouds are therefore both a consequence of atmospheric processes and a visible indicator of those processes.",
      "The next time you look at the sky, the clouds can be thought of as a window into what is happening throughout the atmosphere."
    ]
  },


  // ==========================================================
  // ARTICLE 2
  // ==========================================================

  {
    id: 2,

    title: "Reading Satellite Images",
    category: "satellites",
    readTime: "7 min",

    image1: "images/learning/goes1.png",
    image2: "images/learning/goes2.jpg",

    summary:
      "Learn how meteorological satellites allow us to observe clouds, storms, water vapor, and atmospheric structure from space.",

    articleTitle: "Reading Meteorological Satellite Images",

    subtitle:
      "A first look at how satellites allow us to observe the atmosphere from above.",

    introduction: [
      "Weather satellites provide one of the most powerful ways of observing the atmosphere. Unlike a weather station, which measures conditions at a single location, a satellite can observe enormous regions of the Earth simultaneously.",
      "Different satellite channels allow us to see different properties of the atmosphere, from visible clouds to water vapor and thermal radiation."
    ],

    sections: [
      {
        id: "visible",
        title: "Visible imagery",

        paragraphs: [
          "Visible satellite imagery is similar to a photograph taken from space. It measures sunlight reflected by clouds and the Earth's surface.",
          "Because it relies on sunlight, visible imagery is particularly useful during daytime. Thick clouds generally appear bright because they reflect a large amount of incoming solar radiation."
        ],

        image: "/images/learning/satellite-visible.jpeg",

        caption:
          "Example of visible satellite imagery showing cloud structures."
      },

      {
        id: "infrared",
        title: "Infrared imagery",

        paragraphs: [
          "Infrared channels measure thermal radiation emitted by the Earth and atmosphere.",
          "Because temperature generally decreases with altitude in the troposphere, high cloud tops can appear colder than lower clouds. This makes infrared imagery particularly useful for identifying deep convective systems."
        ],

        image: "/images/learning/satellite-infrared.jpeg",

        caption:
          "Infrared satellite imagery highlighting differences in cloud-top temperature."
      },

      {
        id: "water-vapor",
        title: "Water vapor imagery",

        paragraphs: [
          "Water vapor channels are sensitive to moisture in particular layers of the atmosphere.",
          "They can reveal large-scale atmospheric structures that may not be obvious in visible imagery, including dry-air intrusions, upper-level troughs, and moisture transport."
        ]
      }
    ],

    conclusion: [
      "Satellite imagery gives meteorologists a unique perspective on atmospheric processes occurring over large spatial scales.",
      "Learning to interpret different satellite channels is therefore an important skill for understanding modern weather analysis."
    ]
  },


  // ==========================================================
  // ARTICLE 3
  // ==========================================================

  {
    id: 3,

    title: "Light Pollution",
    category: "atmosphere",

    readTime: "6 min",

    image1: "images/learning/falchi-2016_fig4.png",
    image2: "images/learning/seasonalResult.png",

    summary:
      "Discover how artificial light interacts with the atmosphere and why dark skies are important for astronomy.",

    articleTitle: "Light Pollution and the Night Sky",

    subtitle:
      "How artificial light travels through the atmosphere and changes what we see after sunset.",

    introduction: [
      "The night sky is not completely dark. Even far from cities, the atmosphere can scatter natural and artificial sources of light.",
      "Artificial light emitted by cities can travel upward and interact with atmospheric particles, producing the familiar glow that surrounds urban areas."
    ],

    sections: [
      {
        id: "skyglow",
        title: "What is skyglow?",

        paragraphs: [
          "Skyglow is the diffuse brightness observed above populated areas as a result of artificial light being scattered by molecules, aerosols, and clouds.",
          "The amount of skyglow depends on several factors, including the amount and spectrum of artificial lighting, atmospheric conditions, and the distance between the observer and illuminated areas."
        ],

        image: "/images/learning/skyglow.jpeg",

        caption:
          "Artificial light scattered through the atmosphere produces a visible glow above urban areas."
      },

      {
        id: "atmosphere",
        title: "The role of the atmosphere",

        paragraphs: [
          "Atmospheric aerosols play an important role in determining how efficiently artificial light is scattered.",
          "Humidity can also modify the optical properties of aerosols, while clouds can dramatically increase the amount of artificial light scattered back toward the ground."
        ]
      },

      {
        id: "astronomy",
        title: "Why does it matter for astronomy?",

        paragraphs: [
          "Astronomical observations require a dark background sky. Increasing sky brightness makes faint stars and distant astronomical objects more difficult to detect.",
          "This is particularly important for observatories located in remote regions, where preserving naturally dark skies is an important part of maintaining observational quality."
        ]
      }
    ],

    conclusion: [
      "Understanding atmospheric scattering allows us to better understand how artificial light affects the night environment.",
      "The same atmosphere that allows us to experience beautiful sunsets can also scatter artificial light and brighten the night sky."
    ]
  }
];