"use client"

export default function HomeMain() {
    return <div style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
        className="flex flex-col justify-center text-white items-center bg-cover w-full h-[480px] bg-[linear-gradient(30deg,rgba(0,0,0,0.5),rgba(0,0,0,0)),url('https://static.vecteezy.com/system/resources/thumbnails/030/787/743/small_2x/blurred-modern-living-room-interior-with-stylish-sofa-and-wooden-lamp-for-captivating-backgrounds-generative-ai-photo.jpg')]">
        <h1 className="text-[72px]">Talk with Many</h1>
        <p className="text-xl">Share your thoughts, feelings, and ideas with people around the world.</p>
        <button onClick={() => location.href = "/forum"} className="bg-orange-500 transition hover:bg-orange-400 drop-shadow-2xl text-3xl fold-bold rounded-full px-8 py-4 mt-10">Let's Talk</button>
    </div>
}