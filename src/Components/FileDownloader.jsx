import RNFS from 'react-native-fs';

export const FileDownloader = async (url, filename) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}.pdf`;
    const externalPath = `${RNFS.ExternalDirectoryPath}/${filename}.pdf`;

    const options = {
        fromUrl: url,
        toFile: filePath,
        begin: (res) => {
            console.log('Download has started');
        },
        progress: (res) => {
            const percentage = (res.bytesWritten / res.contentLength) * 100;
            console.log(`Download progress: ${percentage.toFixed(2)}%`);
        },
    };

    try {
        // Start downloading the file
        const downloadResponse = await RNFS.downloadFile(options).promise;

        if (downloadResponse.statusCode === 200) {
            console.log('File downloaded successfully');
            // Copy the file to the external directory
            await RNFS.copyFile(filePath, externalPath);
            console.log('File copied successfully to external path');
            return { message: 'File downloaded and copied successfully' };
        } else {
            throw new Error('Download failed with status code: ' + downloadResponse.statusCode);
        }
    } catch (error) {
        console.error('Error during download or copy:', error);
        return { message: 'Download or copy failed', error: error.message };
    }
};
