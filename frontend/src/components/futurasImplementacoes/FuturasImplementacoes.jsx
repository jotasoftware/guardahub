import React from 'react'

const FuturasImplementacoes = () => {
  return (
    <div className="flex-[5] flex items-center justify-center h-full p-10">
          <div className="flex flex-col items-center justify-center h-[80%] w-full">
              <div className="text-center mb-4">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      GERAPETI
                  </h1>
                  <h2 className="text-xl text-gray-500 font-light">
                      Futuras Implementações
                  </h2>
              </div>
              <div className="flex items-center justify-center w-[400px] animate-pulse">
              <img
                  src="GeraPetiImg.png"
                  alt="Login"
                  className="object-contain"
              />
              </div>
          </div>
      </div>
  )
}

export default FuturasImplementacoes