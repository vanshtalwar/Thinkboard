import React from 'react'
import { Link } from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
    return (

        <header className='bg-base-100'>
            <div className='max-w-6xl mx-auto p-4'>
                <div className='flex items-center justify-between' >
                    <h1 className='text-primary font-mono font-bold text-3xl tracking-tight'>Thinkboard</h1>
                    <div className='flex items-center gap-4'>
                    <Link to={"/create"} className='btn btn-primary'>
                    <PlusIcon className='size-5'/>
                    <span>New Note</span>
                    </Link>
                    
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navbar