import React from 'react'

const featuredartworks = () => {
  return (
    <div>
            <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Featured Artwork</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Explore some of the most iconic artworks in our collection. Each piece tells a story and reflects the creativity of its creator.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {[{
            title: "Masterpiece One",
            image: "https://via.placeholder.com/400x300?text=Artwork+One",
            description: "Description of Masterpiece One, highlighting its significance and artistic elements. This piece is a stunning example of abstract expressionism.",
          },
          {
            title: "Masterpiece Two",
            image: "https://via.placeholder.com/400x300?text=Artwork+Two",
            description: "Description of Masterpiece Two, highlighting its significance and artistic elements. This piece captures the essence of cultural heritage.",
          },
          {
            title: "Masterpiece Three",
            image: "https://via.placeholder.com/400x300?text=Artwork+Three",
            description: "Description of Masterpiece Three, highlighting its significance and artistic elements. This piece is a modern take on classical themes.",
          }].map((artwork, index) => (
            <div key={index} className="featured-artwork-item bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <img src={artwork.image} alt={artwork.title} className="w-full h-auto object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{artwork.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default featuredartworks