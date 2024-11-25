import React from "react";
import './NftPreview.css';

interface NftPreviewProps {
    previewImage: string; // Type for the `previewImage` prop
}

const NftPreview: React.FC<NftPreviewProps> = ({ previewImage }) => {
    return (
        <div className="nft-preview">
            <img src={previewImage} alt="NFT Preview" className="nft-image" />
        </div>
    );
}

export default NftPreview;
