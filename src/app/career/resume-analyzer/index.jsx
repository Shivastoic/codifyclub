'use client';

import { useState } from 'react';

export default function ResumeAnalyzer() {

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [error, setError] = useState(null);

	const handleFileChange = (e) => {

		const selectedFile = e.target.files[0];

		if (selectedFile && selectedFile.type === 'application/pdf') {
			setFile(selectedFile);
			setFileName(selectedFile.name);
			setError(null);
		} else {
			setFile(null);
			setFileName('');
			setError('Please select a valid PDF file');
		}

	};

	const extractTextFromPDF = async (pdfFile) => {

		const formData = new FormData();
		formData.append('file', pdfFile);
		
		try {
			const response = await fetch('/api/extract-pdf', {
				method: 'POST',
				body: formData,
			});
		
			if (!response.ok) {
				throw new Error('Failed to extract text from PDF');
			}
			
			const data = await response.json();
			return data.text;
		} catch (err) {
			console.error('Error extracting text:', err);
			throw err;
		}

	};

	const getResumeFeedback = async (resumeText) => {

		try {
			const response = await fetch('/api/analyze-resume', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({ resumeText }),
			});
			
			if (!response.ok) {
				throw new Error('Failed to analyze resume');
			}
			
			const data = await response.json();
			return data.feedback;
		} catch (err) {
			console.error('Error analyzing resume:', err);
			throw err;
		}

	};

	const handleUpload = async () => {

		if (!file) {
			setError('Please select a file');
			return;
		}

		setIsUploading(true);
		setIsProcessing(true);
		setError(null);
		
		try {
			// Step 1: Extract text from PDF
			const extractedText = await extractTextFromPDF(file);
			
			// Step 2: Send text to Gemini Flash 2.0 model for analysis
			const resumeFeedback = await getResumeFeedback(extractedText);
			
			// Step 3: Display feedback
			setFeedback(resumeFeedback);
		} catch (err) {
			setError(`Error processing resume: ${err.message}`);
		} finally {
			setIsUploading(false);
			setIsProcessing(false);
		}

	};

	return (
		<div className="bg-white rounded-lg shadow-lg py-8">
			<h1 className="text-2xl md:text-4xl font-sora font-semibold text-center">Resume Analyzer</h1>
			
			<div className="m-6">
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
				<input
					type="file"
					id="resume-upload"
					accept=".pdf"
					onChange={handleFileChange}
					className="hidden"
				/>
				<label 
					htmlFor="resume-upload"
					className="flex flex-col items-center justify-center cursor-pointer"
				>
					<svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
					</svg>
					<p className="text-lg font-medium">
					{fileName ? fileName : 'Drop your resume PDF here or click to browse'}
					</p>
					<p className="text-sm text-gray-500 mt-1">Only PDF files are supported</p>
				</label>
				</div>
			</div>

			{error && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
				{error}
				</div>
			)}

			<div className="flex justify-center">
				<button
				onClick={handleUpload}
				disabled={!file || isUploading}
				className={`px-6 py-2 rounded-lg text-white font-medium ${
					!file || isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
				}`}
				>
				{isUploading ? 'Processing...' : 'Analyze Resume'}
				</button>
			</div>

			{isProcessing && (
				<div className="mt-8 text-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
					<p className="mt-2 text-gray-600">Analyzing your resume...</p>
				</div>
			)}

			{feedback && (
				<div className="space-y-10 p-6 bg-gray-50 rounded-lg">
					<h2 className="text-2xl md:text-3xl font-semibold mb-4">Resume Feedback</h2>
					
					<div className="space-y-8">
						{feedback.strengths && (
						<div>
							<h3 className="text-xl font-medium text-green-600">Strengths</h3>
							<ul className="ml-5 mt-2 list-disc">
							{feedback.strengths.map((strength, index) => (
								<li key={index} className="text-gray-700">{strength}</li>
							))}
							</ul>
						</div>
						)}
						
						{feedback.weaknesses && (
						<div>
							<h3 className="text-xl font-medium text-red-600">Areas for Improvement</h3>
							<ul className="ml-5 mt-2 list-disc">
							{feedback.weaknesses.map((weakness, index) => (
								<li key={index} className="text-gray-700">{weakness}</li>
							))}
							</ul>
						</div>
						)}
						
						{feedback.suggestions && (
						<div>
							<h3 className="text-xl font-medium text-blue-600">Suggestions</h3>
							<ul className="ml-5 mt-2 list-disc">
							{feedback.suggestions.map((suggestion, index) => (
								<li key={index} className="text-gray-700">{suggestion}</li>
							))}
							</ul>
						</div>
						)}
						
						{feedback.overallScore && (
						<div className="mt-6 pt-4 border-t border-gray-200">
							<h3 className="text-2xl font-medium">Overall Score</h3>
							<div className="mt-2 w-full bg-gray-200 rounded-full h-4">
							<div 
								className="bg-blue-600 h-4 rounded-full" 
								style={{ width: `${feedback.overallScore}%` }}
							></div>
							</div>
							<p className="mt-1 text-right font-bold">{feedback.overallScore}/100</p>
						</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
