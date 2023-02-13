import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'

const CreatePoste = () => {

  const navigate = useNavigate()
  const [form , setForm] = useState({
      name: '',
      prompt: '',
      photo: '',
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  
  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          })          
        })
        const data = await response.json()

        console.log(data)

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      }catch(err){
        alert(err)
      }finally{
        setGeneratingImg(false)
      }
    }else{
      alert('Entrez une descripition svp!')
    }
  }
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit =  async (e) => {
    e.preventDefault()

    if(form.prompt && form.photo){
      setLoading(true)

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photo
          })          
        })

        await response.json();
        navigate('/')
      }catch(err){
        alert(err)
      }finally{
        setLoading(false)
      }
    }else{
      alert("Entres une description svp pour générer l'image")
    }

  }
  
  const handleSurpriseMe = () => {
      const randomPromt = getRandomPrompt(form.prompt)

      setForm({...form , prompt: randomPromt})
  }



  return (
    <section className="max-x-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] test-[32px]'>
          Créer
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
          Créez une magnifique image créée par 
          intelligence artificielle et partager la avec vos amis.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Votre nom"
              type = "text"
              name = "name"
              placeholder = "Joy Boy"
              value={form.value}
              handleChange={handleChange}
            />
            <FormField
              labelName="Description de l'image"
              type = "text"
              name = "prompt"
              placeholder = "an armchair in the shape of an avocado"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative bg-gray-50 border 
            border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64
            flex justify-center items-center">
                {form.photo ? (
                  <img 
                     src={form.photo} 
                     alt={form.prompt} 
                     className="w-full h-full object-contain"
                    />
                ) : (
                  <img
                     src={preview} 
                     alt="aperçus" 
                     className="w-9/12 h-9/12 object-contain opacity-40"
                     />
                )}

                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex 
                  justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader/>
                  </div>
                )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button 
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md
               text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? 'Création...' : 'Générer'}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">Une fois l'image générée vous pouvez la partager avec la communauté</p>
            <button
              type="button"
              className="mt-3 text-white bg-[#6469ff] font-medium
               rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
               onClick={handleSubmit}
            >
              {loading ? "Publication..." : "Partager"}
            </button>
          </div>
      </form>
    </section>
  )
}

export default CreatePoste