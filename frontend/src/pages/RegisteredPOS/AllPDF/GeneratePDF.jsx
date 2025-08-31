import React from 'react'
import { pdf } from '@react-pdf/renderer';

import { saveAs } from 'file-saver';
import AllDistrictsReport from './Districts';
import DistrictReport from './Blocks';
import BlockReport from './Blockwise';

 export const generateAllDistrictsPDF = async (documentData, currentTime) => {
        const blob = await pdf((
            <AllDistrictsReport
            tableData={documentData} 
            currentTime={currentTime}
                
            />
        )).toBlob();
        saveAs(blob, 'POS_Registered_Report');
};

export const generateDistrictPDF = async (documentData, currentTime) => {
    const blob = await pdf((
        <DistrictReport
        tableData={documentData} 
        currentTime={currentTime}
            
        />
    )).toBlob();
    saveAs(blob, 'POS_Registered_DistrictReport');
};

export const generateBlockPDF = async (documentData, currentTime) => {
    const blob = await pdf((
        <BlockReport
        tableData={documentData} 
        currentTime={currentTime}
            
        />
    )).toBlob();
    saveAs(blob, 'POS_Registered_BlockReport');
};




