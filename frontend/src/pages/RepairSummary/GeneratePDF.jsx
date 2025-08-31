import React from 'react'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFReport from './PDFReport';

export const generatePOSStatusPDF = async(documentData, currentTime)=>{
    const blob = await pdf((
        <PDFReport
        tableData={documentData} 
        currentTime={currentTime}
            
        />
    )).toBlob();
    saveAs(blob, 'POS_Status Report');
}
