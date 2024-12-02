import Link from 'next/link'

export default function NotFound() {
    return <div className='min-h-screen flex flex-col justify-center items-center'>
        <h1>Oops! 404</h1>
        <p>Looks like you're trying to access the page that no longer exist.</p>
        <Link href="/">Return</Link>
    </div>
}