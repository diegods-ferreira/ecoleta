/**
 * Imports de pacotes necessários.
 */
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css';

/**
 * Interface que define os as propriedades personalizadas no Dropzone.
 */
interface Props {
  onFileUploaded: (file: File) => void;
};

/**
 * Constroi o componente de Dropzone.
 */
const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  /**
   * Definição de estados.
   */
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  /**
   * Configura a ação ao selecionar/soltar uma foto.
   */
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  /**
   * Configura a ação onDrop e os tipos de arquivos aceitos.
   */
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl ?
          <img src={selectedFileUrl} alt="Point thumbnail" /> :
          isDragActive ?
            <p><FiUpload />Solte a imagem aqui ...</p> :
            <p><FiUpload />Arraste e solte a imagem aqui, ou clique e selecione.</p>
      }
    </div>
  );
};

/**
 * Exporta o componente Dropzone.
 */
export default Dropzone;