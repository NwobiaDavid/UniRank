import React from 'react'

const Faqs = () => {
    return (
        <div className=' w-full flex flex-col xl:h-[60vh] overflow-hidden relative p-2 items-center justify-center '>
            <div className='text-white xl:w-[50%] text-center mb-7 xl:mb-5   ' >
                <h1 className=' text-3xl md:text-4xl font-bold md:font-semibold capitalize opacity-80 ' >popularly asked questions</h1>
                <p className='  ' > a list of most asked questions, hopefully yours have been answered here</p>
            </div>
            <div className=" w-full lg:w-[60%] md:w-[80%] xl:w-[50%] gap-3 flex flex-col ">
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title md:text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs
