import NotesCard from "@/components/NotesCard"

export default function NotesCardDemo() {
  const sampleNotes = [
    {
      title: "Advanced Mathematics for Class 12",
      des: "Comprehensive study material covering calculus, algebra, and trigonometry with solved examples and practice questions.",
      subject: "Mathematics",
      classes: "12",
      isFree: false,
      price: 299,
      thumbnail: "https://www.roxyjames.com/wp-content/uploads/2014/08/notes1.jpg",
    },
    {
      title: "Physics Fundamentals",
      des: "Complete physics notes covering mechanics, thermodynamics, and electromagnetism with detailed explanations.",
      subject: "Physics",
      classes: "11",
      isFree: true,
      thumbnail: "https://i.pinimg.com/736x/59/b2/08/59b2080c2dc054fde9d675342ed0f1aa.jpg",
    },
    {
      title: "Organic Chemistry Basics",
      des: "Essential organic chemistry concepts with reaction mechanisms and molecular structures explained in simple terms.",
      subject: "Chemistry",
      classes: "10",
      isFree: false,
      price: 199,
    },
    {
      title: "English Literature Guide",
      des: "Comprehensive analysis of poems, prose, and drama with character studies and thematic discussions.",
      subject: "English",
      classes: "9",
      isFree: true,
      thumbnail: "https://i.pinimg.com/originals/01/26/31/012631eebb69897604d06f137810de7b.png",
    },
  ]

  return (
    <div className="min-h-screen  mt-22 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold  mb-4">Study Notes Collection</h1>
          <p className="text-lg  max-w-2xl mx-auto">
            Discover high-quality study materials designed to help you excel in your academics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sampleNotes.map((note, index) => (
            <NotesCard key={index} {...note} />
          ))}
        </div>
      </div>
    </div>
  )
}
