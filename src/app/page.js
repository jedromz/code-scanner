import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-bold  mb-6 text-white">
        Supersapiens Demos
      </h1>
      <Link href="/scanner">
        <p className='w-full max-w-xs flex items-center justify-center space-x-2 bg-black text-white border-blue-500 border-2 px-4 py-2 rounded'>
          Scanner
        </p>
      </Link>
    </div>
  )
}
