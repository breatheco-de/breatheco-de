import React, { useEffect, useState } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import ExternalProfile from '../templates/online-cv/pdf.js';

export default ({ data, pageContext }) => {
  const node = pageContext;
  const [isBuilt, setIsBuilt] = useState(false);
  useEffect(() => {
    setIsBuilt(true)
  }, [])
  return (<>
    {isBuilt && <PDFViewer width={1500} height={1500}><ExternalProfile node={node}/></PDFViewer>}
  </>
  )
}