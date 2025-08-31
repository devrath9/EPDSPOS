import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { assets } from '../../../assets/assets'
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontSize: '12px',
        padding: '30px 32px'
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
        width: "20%",
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
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        textAlign: "center",
        fontSize: '10px',
    },

    totalCol:{
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#2C3E50",

    }





});




const format = { hour: '2-digit', minute: '2-digit', hour12: true };
// 

const AllDistrictsReport = ({tableData, currentTime}) => (
    <Document>
        <Page size="A4" style={styles.page} >
            {/**------HEADERS--------- */}

            <View style={styles.mainheading}>
                <Image src={assets.rajaslogo} style={{ width: '80', height: '60' }} />
                <Text style={{ color: '#36454F', fontSize: '12', marginTop: '2', fontWeight: 'bold' }}>
                    Food and Civil Supplies Department
                </Text>
            </View>



            <Text style={styles.headerText}>Registered POS Report</Text>
            <Text style={{ marginLeft: 'auto', padding: '2', fontSize: '10' }}>
             Created on: <Text style={{ fontWeight: 'bold' }}>
                            {new Date(currentTime).toLocaleDateString('en-GB', format)}
                            </Text>
            </Text>


            {/**-----TABLE-------- */}

            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableHeaderRow, styles.fixed]} fixed>
                    <Text style={styles.tableColHeader}>S.No</Text>
                    <Text style={styles.tableColHeader}>District</Text>
                    <Text style={styles.tableColHeader}>Total FPS</Text>
                    <Text style={styles.tableColHeader}>Registered FPS</Text>
                    <Text style={styles.tableColHeader}>% Registered FPS</Text>
                   
                </View>
                {/* Table Rows */}
                {tableData.slice(0,tableData.length-1).map((item) => (
                    <View style={styles.tableRow} wrap={false} key={item.District_ID}>
                        <Text style={styles.tableCol}>{item.District_ID}</Text>
                        <Text style={styles.tableCol}>{item.District}</Text>
                        <Text style={styles.tableCol}>{item.Total_FPS}</Text>
                        <Text style={styles.tableCol}>{item.Registered}</Text>
                        <Text style={styles.tableCol}> {Math.floor((item.Registered*100/item.Total_FPS)*100)/100}%</Text>
                        

                    </View>
                ))}
                {tableData.slice(-1).map((item) => (
                    <View style={styles.tableRow} key={item.District_ID}>
                        <Text style={[styles.tableCol, styles.totalCol]}></Text>
                        <Text style={[styles.tableCol, styles.totalCol]}>Total</Text>
                        <Text style={[styles.tableCol, styles.totalCol]}>{item.Total_FPS}</Text>
                        <Text style={[styles.tableCol, styles.totalCol]}>{item.Registered}</Text>
                        <Text style={[styles.tableCol, styles.totalCol]}></Text>
                        

                    </View>
                ))}

               <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} / ${totalPages}`
               )} fixed /> 

            </View>

        </Page>
    </Document>
);

export default AllDistrictsReport



