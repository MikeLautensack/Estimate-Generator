export interface IPDFRepository {
  getPDFs(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<any[]>;
  getPDFById(id: string): Promise<any>;
  createPDF(pdfData: any): Promise<void>;
  updatePDF(id: string, pdfData: any): Promise<void>;
  deletePDF(id: string): Promise<void>;
}
