'use client';

import { Dialog, DialogPanel } from '@headlessui/react';

export default function LetterFromPresident() {
  return (
    <div className="bg-gray-900 text-gray-200">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <h1 className="text-5xl font-semibold tracking-tight text-yellow-400">A Letter from the President</h1>
          <p className="mt-8 text-lg font-medium">Dear Members and Friends,</p>
          <p className="mt-4 text-lg">
            As we continue to celebrate the rich culture and artistry of our continent, it is essential to recognize the importance of cultural preservation. Our museum stands as a testament to the vibrant history and artistic expressions that define the African experience.
          </p>
          <p className="mt-4 text-lg">
            We invite you to explore our latest exhibitions, which showcase the works of both traditional and contemporary artists from the Niger Delta region. Together, we can foster a deeper appreciation for our diverse heritage and ensure its preservation for future generations.
          </p>
          <p className="mt-4 text-lg">Thank you for your continued support.</p>
          <p className="mt-4 text-lg font-semibold">
            Sincerely,<br/>
            The President<br/>
            African Museum Association
          </p>
        </div>
      </div>
    </div>
  );
}
