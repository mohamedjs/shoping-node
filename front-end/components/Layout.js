import Head from 'next/head'
import Link from 'next/link'
import SearchInput from './SearchInput'

export const Layout = ({ title, children }) => {
  return (
    <>
        <Head>
            <title>{title ? `${title} - Amzona` : 'Amzona - Modern Shopping Experience'}</title>
            <meta name="description" content="Your premier destination for modern shopping" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='flex min-h-screen flex-col justify-between bg-[var(--background)]'>
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <nav className="flex h-20 items-center justify-between px-8">
                    {/* Left: Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="nav-link font-semibold">Home</Link>
                        <Link href="/products" className="nav-link font-semibold">Product</Link>
                        <Link href="/brands" className="nav-link font-semibold">Brand</Link>
                    </div>
                    {/* Center: Logo */}
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className='text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent tracking-tight'>
                                Ghaza
                            </span>
                        </Link>
                    </div>
                    {/* Right: Search, Cart, User */}
                    <div className="flex items-center gap-4 min-w-[320px] justify-end">
                        <div className="w-48">
                            <SearchInput />
                        </div>
                        <Link href="/cart" className="nav-link flex items-center relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </Link>
                        <Link href="/login" className="nav-link flex items-center">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg> */}
                            <span className="hidden md:inline">Login</span>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className='container m-auto mt-4 px-4 animate-fade-in'>{children}</main>
            <footer className="bg-white mt-12">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[var(--text)]">Amzona</h3>
                            <p className="text-gray-600">Your premier destination for modern shopping</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--text)]">Services</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="nav-link">Branding</a></li>
                                <li><a href="#" className="nav-link">Design</a></li>
                                <li><a href="#" className="nav-link">Marketing</a></li>
                                <li><a href="#" className="nav-link">Advertisement</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--text)]">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="nav-link">About us</a></li>
                                <li><a href="#" className="nav-link">Contact</a></li>
                                <li><a href="#" className="nav-link">Careers</a></li>
                                <li><a href="#" className="nav-link">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--text)]">Newsletter</h4>
                            <div className="space-y-4">
                                <p className="text-gray-600">Stay updated with our latest offers</p>
                                <div className="flex">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:border-[var(--primary)]"
                                    />
                                    <button className="button-primary rounded-l-none">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
                        <p>&copy; {new Date().getFullYear()} Amzona. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    </>
  )
}
