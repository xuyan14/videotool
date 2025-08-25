#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import PyPDF2
import sys

def read_pdf(file_path):
    """读取PDF文件内容"""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            print(f"PDF文件信息:")
            print(f"页数: {len(pdf_reader.pages)}")
            print(f"元数据: {pdf_reader.metadata}")
            print("\n" + "="*50 + "\n")
            
            # 读取所有页面内容
            for i, page in enumerate(pdf_reader.pages):
                print(f"第 {i+1} 页内容:")
                print("-" * 30)
                text = page.extract_text()
                print(text)
                print("\n" + "="*50 + "\n")
                
    except Exception as e:
        print(f"读取PDF时出错: {e}")

if __name__ == "__main__":
    pdf_file = "PRD-AIGC视频工具一期.pdf"
    read_pdf(pdf_file)
