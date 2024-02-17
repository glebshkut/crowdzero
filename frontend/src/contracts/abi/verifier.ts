export const verifierABI = [
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "X",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "Y",
                "type": "uint256"
              }
            ],
            "internalType": "struct Pairing.G1Point",
            "name": "a",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256[2]",
                "name": "X",
                "type": "uint256[2]"
              },
              {
                "internalType": "uint256[2]",
                "name": "Y",
                "type": "uint256[2]"
              }
            ],
            "internalType": "struct Pairing.G2Point",
            "name": "b",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "X",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "Y",
                "type": "uint256"
              }
            ],
            "internalType": "struct Pairing.G1Point",
            "name": "c",
            "type": "tuple"
          }
        ],
        "internalType": "struct Verifier.Proof",
        "name": "proof",
        "type": "tuple"
      },
      {
        "internalType": "uint256[1]",
        "name": "input",
        "type": "uint256[1]"
      }
    ],
    "name": "verifyTx",
    "outputs": [
      {
        "internalType": "bool",
        "name": "r",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];