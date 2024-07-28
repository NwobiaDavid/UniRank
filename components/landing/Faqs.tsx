import React from 'react'

const Faqs = () => {
    return (
        <div className=' w-full flex flex-col  overflow-hidden relative items-center justify-center '>
            <div className='text-white xl:w-[50%] text-center mb-5   ' >
                <h1 className='text-4xl font-semibold capitalize opacity-80 ' >popularly asked questions</h1>
                <p> a list of most asked questions, hopefully yours have been answered here</p>
            </div>
            <div className="  xl:w-[50%] gap-3 flex flex-col ">
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs
