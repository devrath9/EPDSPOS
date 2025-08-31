import React from 'react'

const Appliedfilters = ({cardfilter, transfilter}) => {
    return (
        <div>
            <div className='flex gap-2'>

                <p className='font-semibold '>Transaction Type :</p>
                <div className='flex flex-wrap gap-x-2 gap-y-1 items-center ' >
                    {(transfilter).length === 0 ?
                        (<p>ALL</p>) :

                        (transfilter.map((item) => (
                            <button className='bg-[#2180c0] text-white px-2 text-xs rounded py-0.5 font-semibold' disabled 
                            key={item}>{item}
                            </button>
                        )))
                    }
                </div>
            </div>



            <div className='flex gap-2'>
                <p className='font-semibold mt-3'>Card Type :</p>
                <div className='flex flex-wrap gap-x-2 items-center mt-3 ' >
                    {(cardfilter).length === 0 ?
                        (<p>ALL</p>) :

                        (cardfilter.map((item) => (
                            <button className='bg-[#2180c0] text-white px-2 text-xs rounded py-0.5 font-semibold' disabled
                            key={item}>{item}
                            </button>
                        )))
                    }
                </div>
            </div>
        </div>
    )
}

export default Appliedfilters
