import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Vastraa is more than just an e-commerce platform — it's a celebration of style, culture, and comfort. Founded with a vision to bring thoughtfully curated fashion to your fingertips, Vastraa is where tradition meets trend.</p>
      <p>We believe that fashion should not only make you look good but also feel great. Our collections are handpicked to suit every mood, moment, and milestone — whether it’s a festive celebration, a casual day out, or a powerful boardroom presence.</p>
      <p>At Vastraa, we prioritize:</p>
            <p>✨ Quality: Premium fabrics and craftsmanship you can feel.</p>
            <p>🚚 Convenience: Seamless shopping, fast delivery.</p>
            <p>❤️ Customer Satisfaction: Friendly support, easy returns.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>"To empower every individual to express themselves through fashion that blends comfort, culture, and contemporary style."</p>
            <p>"To deliver high-quality, affordable fashion that celebrates individuality, embraces diversity, and supports sustainable choices."</p>
            <p>"To create a seamless online shopping experience where trend meets tradition, and every customer feels confident, stylish, and valued."</p>
      </div>

    </div>

    <div className='text-xl py-4'>
      <Title  text1={'WHY'} text2={'CHOOSE US'}/>
    </div>
    
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>👗 Curated Collections :</b>
        <p>
        We bring you handpicked styles that reflect the latest trends while staying true to timeless elegance. Whether you're dressing for work, festivities, or daily wear — we’ve got you covered.</p>
          <b>🛍️ Seamless Shopping Experience</b>
        <p>
        Enjoy a smooth, user-friendly online experience — from browsing and ordering to fast, reliable doorstep delivery.</p>
        <b>🌱 Style with Purpose</b>
        <p>We are committed to making conscious choices, promoting sustainable practices, and supporting ethical fashion wherever possible.</p>

      </div>
    </div>

    <NewsLetterBox />
      
    </div>
  )
}

export default About
