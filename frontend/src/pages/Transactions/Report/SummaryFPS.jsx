import React, { useEffect, useState,useRef } from 'react'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Admincontext } from '../../../context/Admincontext'
import { Transcontext } from '../../../context/Transcontext'
import Appliedfilters from './Appliedfilters'
import { useContext } from 'react'

const SummaryFPS = () => {

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state)

    //tableref for excel generation
     const tableRef = useRef(null) 


    const { backendUrl } = useContext(Admincontext)
    const {selectedcardTypes,selectedTransTypes} = useContext(Transcontext)  //selected filters from all districts page

    const [FPStrans, setFPStrans] = useState([])

    useEffect(() => {
        fetchFPS()
    }, [])

    const fetchFPS = async () => {
        try {

            const { data } = await axios.post(backendUrl + `/api/admin/transactions/FPS/${location.state.TBlock}`,
                                                                          {cardType : selectedcardTypes.join(','), 
                                                                            TrxType: selectedTransTypes.join(',')}
            )
            if (data.success) {
                setFPStrans(data.FPSTransactions)
                console.log(data.FPSTransactions)
            }
            else {
                console.log(data.message)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='w-full m-1 p-1'>
             <div className='p-1 border-[1.5px] border-gray-300 rounded'>
            <div>
                <button className='bg-[#2191c0] text-white font-semibold w-full mt-0.5 py-2 rounded' disabled>Transaction Summary Report (Block)</button>
            </div>

            <div className='w-full ml-1 py-2 flex flex-start items-center gap-2 px-2  mt-1 rounded font-semibold text-sm'>
                <img className='w-2 h-2 mt-0.5' src={assets.arrow} alt='' />
                <p onClick={() => navigate('/transactionSummary#report')} className='font-semibold underline cursor-pointer'>Entire State</p>
                <img className='w-2 h-2 mt-0.5' src={assets.arrow} alt='' />
                <p onClick={() => { navigate('/transactionSummary/blockReport', { state: { Tdistrict: location.state.TDistrict } }) }}
                    className='font-semibold underline cursor-pointer'>{location.state.TDistrict}</p>
                <img className='w-2 h-2 mt-0.5' src={assets.arrow} alt='' />
                <p className='font-semibold'>{location.state.TBlockname}</p>
            </div>


            <div className='flex flex-col mt-3 m-1.5 border-[1.5px] border-gray-300 px-4 py-2 rounded text-sm'>
                
                <Appliedfilters cardfilter={selectedcardTypes} transfilter={selectedTransTypes}/>
                
              </div>


            <div className='w-full overflow-x-auto mt-3 border-[1.5px] p-1 border-gray-300 rounded'>
                <table ref={tableRef} className="min-w-full table-fixed xl:table-auto border-collapse border border-gray-200 text-sm ">
                    <thead className=''>
                        <tr className='bg-[#2191c0] text-white'>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">Sr.No</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">FPS Code</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">FPS Owner</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">FPS Location</th>
                            <th rowSpan="2" className="px-4 py-1 border-b border-gray-300 ">No. of Transaction</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">WHEAT</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">SUGAR</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">DAAL</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">GHEE</th>
                            <th colSpan="2" className="px-4 py-1 border border-gray-300 ">OIL</th>


                        </tr>
                        <tr className='bg-[#2191c0] text-white'>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (MT)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (KL)</th>
                            <th className="px-4 py-1 border border-gray-300 ">TX</th>
                            <th className="px-4 py-1 border border-gray-300 ">Qty (KL)</th>

                        </tr>


                    </thead>
                    <tbody>
                        {FPStrans.map((item, index) => (<tr key={item.FPSCode} className='border-b-2 border-gray-300 font-semibold text-gray-700'>
                            <td className="text-center px-4 py-2"> {index + 1}</td>
                            <td className="text-center px-4 py-2 font-semibold underline cursor-pointer"
                                onClick={() => {
                                    navigate('/transactionSummary/rationReport', {
                                        state: {
                                            TBlock: item.Block_ID,
                                            TDistrict: item.District, TBlockname: item.Block, TFps: item.FPSCode
                                        }
                                    })
                                }}>
                                {item.FPSCode}
                            </td>
                            <td className="text-center px-4 py-2">{item.FPS_Owner}</td>
                            <td className="text-center px-4 py-2">{item.FPS_Location}</td>
                            <td className="text-center px-4 py-2">{item.Total_Trx}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Wheat_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Sugar_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Daal_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Ghee_Quantity}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_TRX}</td>
                            <td className="text-center px-4 py-2 border border-gray-300">{item.Oil_Quantity}</td>
                        </tr>))}



                    </tbody>
                </table>

            </div>

              <div className='ml-2 mt-1 text-sm font-semibold text-white'>
                                      
                         <DownloadTableExcel
                                filename="Transaction Summary Block Report"
                                sheet="Transaction Report"
                                currentTableRef={tableRef.current}>
                                          
                                <button className='px-2 py-1 bg-[#2191c0] rounded'>
                                     Excel
                                </button>
                                          
                        </DownloadTableExcel>
              </div>

            </div>
        </div>
    )
}

export default SummaryFPS
