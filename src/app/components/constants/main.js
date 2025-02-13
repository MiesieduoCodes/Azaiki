const artist = [
  {
    "id": 1,
    "name": "Milicent Osumuo Onuegbu",
    "profileImage": "https://tecxposition.com/wp-content/uploads/elementor/thumbs/Millicent-Osumuo-Onuegbu-bw-pmrlzsis7dqwy4h7run98ibiuz3y9cdvyxlhw2ucvs.jpg",
    "coverimage": "/images/IMG-20250207-WA0018.jpg",
    "image": "/images/IMG-20250101-WA0022.jpg",
    "occupation": "Contemporary Artist",
    "bio": "Millicent Osumuo Onuegbu is a Nigerian contemporary artist and artpreneur. Growing up in a home influenced by her father, a self-taught artist, Millicent's early exposure to art ignited her passion for painting and drawing. She honed her skills at the University of Uyo, Akwa-Ibom State, where she earned a Bachelor of Arts (BA) in Painting in 2002. In 2005, Millicent established Colourmimi Studio in Abuja, where she has continued her full-time artistic practice. Her work reflects her diverse life experiences and explores a range of themes, resulting in a vibrant and dynamic portfolio that has earned her numerous exhibitions, collaborations, and accolades. Millicent also pursued further business education, completing an Owner Manager Programme at the Lagos Business School in 2022 and currently studying Strategy and Innovation. This blend of artistic and business expertise allows her to approach her creative practice with a well-rounded perspective, strengthening her position as a leading contemporary artist and entrepreneur.",
    "achievements": [
      "Artist of the Year Award (2021)",
      "Solo Exhibition at the Tate Modern"
    ],
    "vision": "To create art that evokes deep emotional connections.",
    "contact": {
      "email": "jane.smith@example.com",
      "linkedin": "https://linkedin.com/in/janesmith",
      "twitter": "https://twitter.com/janesmith"
    },
    "artworks": [
      {
        "title": "Another Day, Another Tale",
        "image": "/images/IMG-20250101-WA0024.jpg",
        "description": "This Artwork captures a fleeting moment in the everyday journey of two siblings on an errand for their mama. Their backs are to the viewer, yet the scene speaks volumes about their bond, their world and the stories they share along the way. With each passing day, these errands become adventures, with the children weaving fresh tales and playful stories their imaginations running wild as they move through the familiar sights and sounds of their community. The piece captures the esence of childhood wonder, the innocence of sibling companionship, and the beauty of African Life, where each day offers the promise of a new adventure , and every errand becomes a story waiting to unfold."
      },
      {
        "title": "Defined Identity",
        "image": "/images/IMG-20250101-WA0021.jpg",
        "description": "A fusion of colors inspired by nature."
      },
      {
        "title": "Abstract Art 3",
        "image": "/images/IMG-20250101-WA0022.jpg",
        "description": "A minimalist approach to human emotions."
      }
    ]
  }
  ]


  const testimonials = [
    {
      "quote": "Azaiki Art Gallery is an exceptional space...",
      "name": "Jane Doe",
      "role": "Contemporary Artist",
      "image": "https://example.com/images/jane_doe.jpg"
    },
    {
      "quote": "The museum's collection is a journey through time...",
      "name": "John Smith",
      "role": "Art Historian",
      "image": "https://example.com/images/john_smith.jpg"
    },
    {
      "quote": "Visiting Azaiki Art Gallery was an enlightening experience...",
      "name": "Emily Williams",
      "role": "Art Enthusiast",
      "image": "https://example.com/images/emily_williams.jpg"
    },
    {
      "quote": "As an artist, it was an honor to have my pieces displayed...",
      "name": "Millicent Osumuo Onuegbu",
      "role": "Contemporary Artist",
      "image": "/images/IMG-20250101-WA0022.jpg"
    },
    {
      "quote": "Azaiki Art Gallery and Museum provides an immersive experience...",
      "name": "Sophia Brown",
      "role": "Museum Curator",
      "image": "https://example.com/images/sophia_brown.jpg"
    }
  ]
  
  const navadata = [
    {
      "user": {
        "name": "Contact Us",
        "url": "/contact"
      },
      "teams": [
        {
          "name": "Azaiki Art Gallery & Museum",
          "url": "/"
        }
      ],
      "navMain": [
        {
          "title": "Art Gallery",
          "url": "#",
          "icon": "Palette",
          "isActive": true,
          "items": [
            { "title": "Digital Art", "url": "/digital" },
            { "title": "Contemporary Arts", "url": "/contemporary" },
            { "title": "General", "url": "/all" },
            { "title": "Sculptures", "url": "/sculptures" },
            { "title": "Niger Delta Arts", "url": "/niger-delta" },
            { "title": "African Arts", "url": "/african" }
          ]
        },
        {
          "title": "Museum",
          "url": "#",
          "icon": "RollerCoaster",
          "items": [
            { "title": "Museum Of African Arts", "url": "/african-museum" },
            { "title": "Museum Of Niger Delta", "url": "niger-museum" },
            { "title": "Letter From The President, African Museum Association", "url": "/affirmation" }
          ]
        },
        {
          "title": "Artists",
          "url": "#",
          "icon": "Brush",
          "items": [
            {
              "title": "Millicent Osumuo",
              "url": "/artists?id=3",
              "avatar": "/images/IMG-20250101-WA0022.jpg"
            },
            {
              "title": "Another Artist",
              "url": "/artists?id=2",
              "avatar": "https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg"
            },
            {
              "title": "...View More",
              "url": "/artisans"
            }
          ]
        },
        {
          "title": "More From Azaiki",
          "url": "#",
          "icon": "Palette",
          "isActive": true,
          "items": [
            { "title": "About The Professor", "url": "/prof" },
            { "title": "Azaiki Foundation", "url": "#" },
            { "title": "Azaiki Public Library", "url": "/public-library" },
            { "title": "Azaiki Institute Of Science & Technology", "url": "#" }
          ]
        }
      ]
    }
    
  ]

  const nigerdelta = [
    {
      "artists": [
        {
          "name": "Ebiye Obuba",
          "bio": "A master woodcarver known for intricate designs that reflect the stories and traditions of the Ijaw people.",
          "artworks": [
            {
              "title": "Spirit of the Delta",
              "description": "A sculpture symbolizing the resilience and spirituality of the Niger Delta communities.",
              "image": "/images/ebiye-spirit.jpg"
            },
            {
              "title": "Ceremonial Mask",
              "description": "A mask used in traditional festivals to honor ancestors and deities.",
              "image": "/images/ebiye-mask.jpg"
            }
          ]
        },
        {
          "name": "Boma Kalagbor",
          "bio": "A renowned painter whose works explore the vibrant colors and landscapes of the Niger Delta.",
          "artworks": [
            {
              "title": "Delta Sunrise",
              "description": "A painting capturing the serene beauty of the Niger Delta at dawn.",
              "image": "/images/boma-sunrise.jpg"
            },
            {
              "title": "Market Day",
              "description": "A lively depiction of a bustling market scene in the Niger Delta.",
              "image": "/images/boma-market.jpg"
            }
          ]
        },
        {
          "name": "Tari Amasi",
          "bio": "An innovative beadwork artist who combines traditional techniques with modern aesthetics.",
          "artworks": [
            {
              "title": "Ceremonial Necklace",
              "description": "A handcrafted necklace featuring intricate bead patterns used in royal ceremonies.",
              "image": "/images/tari-necklace.jpg"
            },
            {
              "title": "Cultural Tapestry",
              "description": "A large beadwork tapestry depicting the unity of the Niger Delta tribes.",
              "image": "/images/tari-tapestry.jpg"
            }
          ]
        }
      ]
    }
    ]

    const generalarts = [
      [
        {
          "id": "digital-arts",
          "title": "Digital Arts",
          "background": "bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-700 dark:to-green-800",
          "items": [
            {
              "title": "Digital Art 1",
              "description": "A brief description of Digital Art 1 and its unique style.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Digital Art 2",
              "description": "A brief description of Digital Art 2 and its unique style.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Digital Art 3",
              "description": "A brief description of Digital Art 3 and its unique style.",
              "image": "https://via.placeholder.com/400x300"
            }
          ]
        },
        {
          "id": "sculptures",
          "title": "Sculptures",
          "background": "bg-gradient-to-r from-yellow-500 to-red-500 dark:from-yellow-600 dark:to-red-700",
          "items": [
            {
              "title": "Sculpture 1",
              "description": "A brief description of Sculpture 1 and its artistic significance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Sculpture 2",
              "description": "A brief description of Sculpture 2 and its artistic significance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Sculpture 3",
              "description": "A brief description of Sculpture 3 and its artistic significance.",
              "image": "https://via.placeholder.com/400x300"
            }
          ]
        },
        {
          "id": "niger-delta-arts",
          "title": "Niger Delta Arts",
          "background": "bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-700",
          "items": [
            {
              "title": "Niger Delta Art 1",
              "description": "A brief description of Niger Delta Art 1 and its cultural importance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Niger Delta Art 2",
              "description": "A brief description of Niger Delta Art 2 and its cultural importance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Niger Delta Art 3",
              "description": "A brief description of Niger Delta Art 3 and its cultural importance.",
              "image": "https://via.placeholder.com/400x300"
            }
          ]
        },
        {
          "id": "african-arts",
          "title": "African Arts",
          "background": "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-700",
          "items": [
            {
              "title": "African Art 1",
              "description": "A brief description of African Art 1 and its cultural significance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "African Art 2",
              "description": "A brief description of African Art 2 and its cultural significance.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "African Art 3",
              "description": "A brief description of African Art 3 and its cultural significance.",
              "image": "https://via.placeholder.com/400x300"
            }
          ]
        },
        {
          "id": "contemporary-arts",
          "title": "Contemporary Arts",
          "background": "bg-gradient-to-r from-teal-500 to-indigo-500 dark:from-teal-600 dark:to-indigo-700",
          "items": [
            {
              "title": "Contemporary Art 1",
              "description": "A brief description of Contemporary Art 1 and its modern interpretation.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Contemporary Art 2",
              "description": "A brief description of Contemporary Art 2 and its modern interpretation.",
              "image": "https://via.placeholder.com/400x300"
            },
            {
              "title": "Contemporary Art 3",
              "description": "A brief description of Contemporary Art 3 and its modern interpretation.",
              "image": "https://via.placeholder.com/400x300"
            }
          ]
        }
      ]    
    ]

    const contemporary = [
      [
        {
          "id": 1,
          "name": "Artist 1",
          "image": "https://via.placeholder.com/400x300",
          "description": "A brief description of Artist 1's work and style.",
          "bio": "Artist 1 is known for their abstract paintings that explore the relationship between light and color. Their work has been featured in numerous exhibitions worldwide.",
          "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
        },
        {
          "id": 2,
          "name": "Artist 2",
          "image": "https://via.placeholder.com/400x300",
          "description": "A brief description of Artist 2's work and style.",
          "bio": "Artist 2 specializes in modern sculptures that challenge traditional notions of form and space.",
          "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
        },
        {
          "id": 3,
          "name": "Artist 3",
          "image": "https://via.placeholder.com/400x300",
          "description": "A brief description of Artist 3's work and style.",
          "bio": "Artist 3 is a digital artist focusing on futuristic themes and immersive virtual environments.",
          "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
        },
        {
            "id": 4,
            "name": "Artist 4",
            "image": "https://via.placeholder.com/400x300",
            "description": "A brief description of Artist 3's work and style.",
            "bio": "Artist 3 is a digital artist focusing on futuristic themes and immersive virtual environments.",
            "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
          },
          {
            "id": 5,
            "name": "Artist 5",
            "image": "https://via.placeholder.com/400x300",
            "description": "A brief description of Artist 3's work and style.",
            "bio": "Artist 3 is a digital artist focusing on futuristic themes and immersive virtual environments.",
            "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
          },
          {
            "id": 6,
            "name": "Artist 6",
            "image": "https://via.placeholder.com/400x300",
            "description": "A brief description of Artist 3's work and style.",
            "bio": "Artist 3 is a digital artist focusing on futuristic themes and immersive virtual environments.",
            "portfolio": ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"]
          }
      ]
      
    ]

    export {navadata, testimonials, generalarts, nigerdelta, artist, contemporary};