<?php
    $currentPage = $_SERVER['PHP_SELF'];
?>
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary pb-0 px-0 ">
        <div class="container-fluid d-block px-0 ">
            <div class="d-flex ">
                <a class="navbar-brand ms-2 " href="index.php">
                    <img class="vh-25 mb-2 " src="img\logo.png" alt="logo">
                </a>
                <p class=" display-5  h-100 w-100 text align-self-center text-center"><i class="fa-solid fa-quote-left translate-middle-y"></i>  Explorez le chemin de l'avenir au volant de votre voiture idéale  <i class="fa-solid fa-quote-right translate-middle-y"></i></p>
            </div>
            <button class="navbar-toggler w-100 align-self-center bg-dark " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span><i class="fa-solid fa-bars" style="color: #ffffff;"></i></span>
            </button>
            <div class="collapse navbar-collapse align-self-end bg-dark pb-3 pb-lg-0  ps-3 " id="navbarNavDropdown">
                <div class="container-lg px-0 ">
                    <ul class="navbar-nav navbar-dark justify-content-between ">
                        <li class="nav-item">
                        <a class="nav-link ps-1  <?php if($currentPage === "/php/SuperLocCar/index.php") {echo "active";} ?> fs-4" aria-current="page" href="index.php">Accueil</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fs-4 <?php if(($currentPage === "/php/SuperLocCar/voitures-actuelles.php")||($currentPage === "/php/SuperLocCar/voitures-anciennes.php")) {echo "active";} ?>" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Parc
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item fs-4 <?php if($currentPage === "/php/SuperLocCar/voitures-actuelles.php") {echo "link-light";} ?>" href="voitures-actuelles.php">Voitures actuelles</a></li>
                                <li><a class="dropdown-item fs-4 <?php if($currentPage === "/php/SuperLocCar/voitures-de-collection.php") {echo "link-light";} ?>" href="voitures-de-collection.php">Voitures de collection</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link fs-4 <?php if($currentPage === "/php/SuperLocCar/actualite.php") {echo "active";} ?>" href="actualite.php">Actualités</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link fs-4 <?php if($currentPage === "/php/SuperLocCar/contact.php") {echo "active";} ?>" href="contact.php">Contact</a>
                        </li>
                        <li>
                            <div class="input-group mt-2 me-2 searchBar">
                                <div class="form-outline w-auto d-flex align-items-stretch " data-mdb-input-init>
                                    <input type="search" id="form1" class="form-control-dropdown me-0 h-100 px-2 " placeholder="Rechercher"/>
                                    <button type="button" class="btn btn-dark py-1 px-2 ms-0 "><i class="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item d-flex align-items-center ">
                            <a class="link-light me-4 fs-4" href="#"><i class="fa-brands fa-x-twitter lien-reseaux"></i></a>
                            <a class="link-light me-4 fs-4" href="#"><i class="fa-brands fa-facebook lien-reseaux"></i></a>
                            <a class="link-light me-4 fs-4" href="#"><i class="fa-brands fa-instagram lien-reseaux"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</header>