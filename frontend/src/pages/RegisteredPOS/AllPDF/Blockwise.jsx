import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { assets } from '../../../assets/assets'
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontSize: '12px',
         padding: '30px 32px',
       },

       pageNumbers: {
        position: 'relative',
        marginTop:'3px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '10px',
      },   

    mainheading: {
        flexDirection: 'column',
        gap: '3px',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '6'
    },

    headerText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: "#2C3E50",
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        

    },
    fixed:{
        top: 0,
        left: 0,
        width: '100%',
        position: 'relative',
    },

    table: {
        display: "table",
        width: "auto",
        marginTop: 10,
    },
    tableHeaderRow:{
        flexDirection: "row",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableRow: {
        flexDirection: "row",
        borderLeft:'1',
        borderRight:'1',
        borderColor: "#000",
    },
    tableColHeader: {
        width: "14.28%",
        backgroundColor: "#f2f2f2",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        fontWeight: "bold",
        fontSize: '10px',
        textAlign: "center",
    },
    tableCol: {
        width: "14.28%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        textAlign: "center",
        fontSize: '7px',
        fontWeight: 600
    },

    totalCol:{
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#2C3E50",

    }





});




  
  
  
 
const format = { hour: '2-digit', minute: '2-digit', hour12: true };



const BlockReport = ({tableData, currentTime}) => (

    <Document>
            <Page size="A4" style={styles.page} orientation='landscape'>
                {/**------HEADERS--------- */}
    
                <View style={styles.mainheading}>
                    <Image src={assets.rajaslogo} style={{ width: '80', height: '60' }} />
                    <Text style={{ color: '#36454F', fontSize: '12', marginTop: '2', fontWeight: 'bold' }}>
                        Food and Civil Supplies Department
                    </Text>
                </View>
    
    
    
                <Text style={styles.headerText}>Registered POS Block Report</Text>
    
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    
                   <Text style={{ padding: '2', fontSize: '10' }}>
                      District : <Text style={{fontWeight:"bold"}}>{tableData[0].District}</Text> <br/> 
                      Block : <Text style={{fontWeight:"bold"}}>{tableData[0].Block_Name}</Text>
                   </Text>    
                   <Text style={{ padding: '2', fontSize: '10' }}>
                    Created on: <Text style={{ fontWeight: 'bold' }}>
                                               {new Date(currentTime).toLocaleDateString('en-GB', format)}
                                </Text>
                   </Text>
    
                </View>
    
    
                {/**-----TABLE-------- */}
    
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableHeaderRow, styles.fixed]} fixed>
                       <Text style={styles.tableColHeader}>S.No</Text>
                       <Text style={styles.tableColHeader}>FPSCode</Text>
                       <Text style={styles.tableColHeader}>Shop No</Text>
                       <Text style={styles.tableColHeader}>FPS Owner</Text>
                       <Text style={styles.tableColHeader}>Mobile No</Text>
                       <Text style={styles.tableColHeader}>Device Code</Text>
                       <Text style={styles.tableColHeader}>Install Date</Text>
                    </View>
                    {/* Table Rows */}
                    {tableData.map((item, index) => (
                        <View style={styles.tableRow} key={item.FPSCode}>
                          <Text style={styles.tableCol}>{index+1}</Text>
                          <Text style={styles.tableCol}>{item.FPSCode}</Text>
                          <Text style={styles.tableCol}>{item.Shop_No}</Text>
                          <Text style={styles.tableCol}>{item.FPS_Ouner}</Text>
                          <Text style={styles.tableCol}> {item.MobileNo}</Text>
                          <Text style={styles.tableCol}>{item.Device_Code}</Text>
                          <Text style={styles.tableCol}>
                              { new Date(item.Install_Date).toLocaleDateString('en-GB', format)}
                          </Text>
                       </View>
                    ))}
                   
    
                    <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                                    `Page ${pageNumber} / ${totalPages}`
                                )} fixed /> 
                </View>
    
            </Page>
        </Document>
);

export default BlockReport



