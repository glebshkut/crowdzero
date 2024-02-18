import crypto from 'crypto';
import React, { useEffect, useState } from 'react';
import { Proof, initialize } from 'zokrates-js';

interface ZokratesProps {
  program: string;
  proofArguments: string[];
}

const GetProof: React.FC<ZokratesProps> = ({ program, proofArguments }) => {
  const [proof, setProof] = useState<Proof | null>(null);
  const [hashes, setHashes] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const awaitProof = async () => {
      const zokratesProvider = await initialize();
      const source = await fetch('../../../zk/program.zok').then((res) => res.text());
      const artifacts = zokratesProvider.compile(source);
      const { witness } = zokratesProvider.computeWitness(artifacts, proofArguments);
      const keypair = zokratesProvider.setup(artifacts.program);
      const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
      // const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
      const isVerified = zokratesProvider.verify(keypair.vk, proof);

      const proofHash = crypto.createHash('sha256').update(JSON.stringify(proof)).digest('hex');
      const programHash = crypto.createHash('sha256').update(program).digest('hex');
      const hashes = proofHash + programHash;

      setProof(proof);
      setHashes(hashes);
      setIsValid(isVerified);
    };
    if (!proof) {
      awaitProof();
    }
  }, [program, proof, proofArguments]);

  return (
    <div>
      <h2>ZoKrates Component</h2>
      <button onClick={() => setProof(null)}>Generate New Proof</button>
      {proof ? (
        <div>
          <p>Proof Generated</p>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
          <p>Proof and Program Hashes</p>
          <input type="text" value={hashes} readOnly />
          <p>Proof Validity</p>
          <input type="text" value={isValid ? 'Valid' : 'Invalid'} readOnly />
        </div>
      ) : (
          <p>Generating Proof...</p>
      )}
    </div>
  );
};

export default GetProof;