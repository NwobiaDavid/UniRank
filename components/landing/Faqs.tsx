import React from 'react'

const Faqs = () => {
    return (
        <div className=' w-full flex flex-col xl:h-[60vh] overflow-hidden relative p-2 items-center justify-center '>
            <div className='text-white xl:w-[50%] text-center mb-7 xl:mb-5   ' >
                <h1 className=' text-3xl md:text-4xl font-bold md:font-semibold capitalize opacity-80 ' >Your Questions Answered </h1>
                <p className='  ' > Get clarity on how Unirank works and how it can benefit you</p>
            </div>
            <div className=" w-full lg:w-[60%] md:w-[80%] xl:w-[50%] gap-3 flex flex-col ">
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title md:text-xl  font-semibold"> How does Unirank ensure the accuracy of its IQ tests?</div>
                    <div className="collapse-content">
                        <p>Unirank uses scientifically validated testing methods and continuously updates our questions to reflect current standards in IQ assessment. Our advanced algorithms also verify results to maintain accuracy.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-semibold">What makes Unirank’s university rankings reliable?</div>
                    <div className="collapse-content">
                        <p>Our rankings are based on comprehensive data collected from IQ tests taken by students across various universities. We use a rigorous scoring system and anti-cheating measures to ensure fairness and precision.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-semibold">Can I trust the anti-cheating measures?</div>
                    <div className="collapse-content">
                        <p>Yes, our anti-cheating system employs cutting-edge technology to detect and prevent dishonest behavior. We monitor test sessions in real-time and review flagged activities to ensure test integrity.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title md:text-xl font-semibold">How often are university rankings updated?</div>
                    <div className="collapse-content">
                        <p>University rankings are updated regularly to reflect the most recent test data. This ensures that the rankings are current and accurately represent the academic performance of institutions.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs
