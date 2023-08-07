import React from 'react'


export default function Home() {
  return (

    <div>

      <section>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://images.pexels.com/photos/1841591/pexels-photo-1841591.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." />
              <div class="carousel-caption">
                <h5>SRI LANKA'S BEST ONLINE LIQUOR STORE</h5>
                <p>Discover the many sides of single bar.</p>
                <p><a href="/spirits" class="btn btn-warning mt-3">Shop Now</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://images.pexels.com/photos/3084603/pexels-photo-3084603.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." />
              <div class="carousel-caption">
                <h5>WINES AND BEERS</h5>
                <p>Discover the world of fine wines at suprime wine store.</p>
                <p><a href="/spirits" class="btn btn-warning mt-3">Shop Now</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://images.pexels.com/photos/2796105/pexels-photo-2796105.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." />
              <div class="carousel-caption">
                <h5>CHECK OUT OUR COLLECTION</h5>
                <p>Want to stay up-to-date on the latest trends in the beverage world?.</p>
                <p><a href="/spirits" class="btn btn-warning mt-3">Shop Now</a></p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section>

      </section>



      <section id="about" class="about section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-12">
              <div class="about-img">
                <img src="https://images.pexels.com/photos/3636002/pexels-photo-3636002.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
              <div class="about-text">
                <br />
                <h2>We Provide the Best Quality <br /> Services Ever</h2><br />
                <p>Whether you're shopping in-store or online, we're committed to providing a seamless and hassle-free experience. Our goal is to make your beverage shopping as easy and enjoyable as possible.</p><br />
                <a href="/spirits" class="btn btn-warning">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section class="services section-padding" id="services">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header text-center pb-5">
                <h2>Our Services</h2>
                <p>We offer a vast selection of premium liquor,<br /> including spirits, wines, champagnes, and more, <br /> all at competitive prices. You can trust that every bottle <br />you order from us will be of the highest quality.</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-laptop"></i>
                  <h3 class="card-title">Spirits</h3>
                  <p class="lead">your online destination for premium spirits! We offer a vast selection of whiskeys, rums, tequilas, gins, and more, all at competitive prices.</p>
                  <a href='/spirits'><button class="btn bg-warning text-dark">Shop Now</button></a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-journal"></i>
                  <h3 class="card-title">Wine</h3>
                  <p class="lead">Our online store is the perfect place to find unique and hard-to-find bottles, as well as classic favorites from top wine-producing regions.</p>
                  <a href='/spirits'><button class="btn bg-warning text-dark">Shop Now</button></a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-intersect"></i>
                  <h3 class="card-title">Champagne</h3>
                  <p class="lead">Looking for a gift? Our selection of champagnes is perfect for any occasion.We can even add a personalized note to your order </p>
                  <a href='/spirits'><button class="btn bg-warning text-dark">Shop Now</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
      
            <div class="nav1">
            
              
               
                <div class="text-center p-3" >
                    
                  
                  
                </div>
                
             
            
            </div>
            
                    </div>


      <div class="nav1">



        <div class="text-center p-3" >
          <div class="footerText">
            © 2021 Copyright:

            <a class="text-white" href="/spirits"> suprime.com</a>
            <a href='/LoginPage'><button class="adminBtn"><i class="fa-solid fa-user"></i></button></a>
          </div>



        </div>



      </div>



    </div>


  )
}

