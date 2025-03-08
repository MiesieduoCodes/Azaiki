// components/Portfolio.js
import { useEffect, useState } from 'react';

const portfolioData = [
  {
    "title": "Contemporary Art",
    "description": "Exploring innovative techniques and bold concepts, this exhibit showcases the work of modern artists pushing the boundaries of creativity.",
    "image": "/images/IMG-20250207-WA0021.jpg"
},
{
    "title": "Classic Masterpieces",
    "description": "A curated collection of timeless works by renowned artists, offering a glimpse into the rich history of art and its evolution through the ages.",
    "image": "/images/IMG-20250101-WA0024.jpg"
},
{
    "title": "Sculptural Wonders",
    "description": "This exhibit features stunning sculptures that play with form and space, inviting viewers to experience art in three dimensions.",
    "image": "/images/IMG-20250207-WA0020.jpg"
},
    {
        "image": "/images/IMG-20250207-WA0024.jpg"
    },
    {
        "image": "/images/IMG-20250207-WA0019.jpg"
    },
    {
        "image": "/images/"
    },
    {
        "image": "/images/"
    }
];

const Portfolio = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(portfolioData);
    }, []);

    return (
        <section className="p-16 relative">
            <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
            <div className="flex items-center justify-center flex-col gap-5 mb-14">
    <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-3.5 py-1 rounded-full">
      Our Art Gallery
    </span>
    <h2 className="font-bold text-4xl text-gray-900 dark:text-white text-center">
        Celebrating Artistic Expression
    </h2>
    <p className="text-lg font-normal text-gray-500 dark:text-gray-300 max-w-3xl mx-auto text-center">
        In the realm of art, creativity knows no bounds. Our gallery serves as a vibrant space where diverse artistic expressions come together, inviting visitors to explore, appreciate, and connect with the beauty of human imagination.
    </p>
</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-14">
                    {items.map((item, index) => (
                        <div key={index} className="relative bg-cover rounded-lg flex justify-center flex-col px-7 py-6" 
                             style={item.image ? { backgroundImage: `url(${item.image})` } : {}}>
                            <div>
                              
                            </div>
                            {item.title && (
                                <h6 className="font-medium text-xl leading-8 text-black mb-4">{item.title}</h6>
                            )}
                            {item.description && (
                                <p className="text-base font-normal text-black/70">{item.description}</p>
                            )}
                            {!item.title && item.image && (
                                <img src={item.image} alt={`Portfolio image ${index + 1}`} className="w-full rounded-lg object-cover" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
