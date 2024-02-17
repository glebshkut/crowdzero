import React, { useState, useEffect } from 'react';
import crypto from 'crypto';
// Import the zokrates library
import * as zokrates from 'zokrates-js';

interface ZokratesProps {
  program: string; // The name of the .zok file that contains the zokrates program
  proofArguments: string[]; // The array of arguments that will be passed to the program
}

const GetProof: React.FC<ZokratesProps> = ({ program, proofArguments }) => {
  const [proof, setProof] = useState(null);
  const [hashes, setHashes] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Create an async function
    const awaitProof = async () => {
      // Read the content of the .zok file
      const source = await fetch('../../../zk/program.zok').then((res) => res.text());
      // Compile the program and get the circuit artifact
      const artifact = zokrates.compile(source, 'main');
      // Generate the proving and verification keys
      const { verificationKey, proofKey } = zokrates.setup(artifact.programProof);
      // Compute the witness
      const witness = zokrates.computeWitness(artifact, proofArguments);
      // Generate the proof and the public signals
      const { proof, publicSignals } = zokrates.generateProof(artifact.programProof, witness.witness, proofKey);
      // Verify the proof
      const isValid = zokrates.verify(verificationKey, proof, publicSignals);
      // Generate the hashes of the proof and the program
      const proofHash = crypto.createHash('sha256').update(JSON.stringify(proof)).digest('hex');
      const programHash = crypto.createHash('sha256').update(program).digest('hex');
      // Concatenate the hashes
      const hashes = proofHash + programHash;
      // Set the state with the proof, the hashes and the validity
      setProof(proof);
      setHashes(hashes);
      setIsValid(isValid);
    };
    // Call the async function
    awaitProof();
  }, [program, proofArguments]);

  return (
    <div>
      <h2>Componente Zokrates</h2>
      <button onClick={() => setProof(null)}>Generar nueva prueba</button>
      {proof ? (
        <div>
          <p>Prueba generada</p>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
          <p>Hashes de la prueba y el programa</p>
          <input type="text" value={hashes} readOnly />
          <p>Validez de la prueba</p>
          <input type="text" value={isValid ? 'Válida' : 'Inválida'} readOnly />
        </div>
      ) : (
        <p>Generando prueba...</p>
      )}
    </div>
  );
};

export default GetProof;