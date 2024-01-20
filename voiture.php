<?php require_once "_head.php"; ?>
<body>
    <?php require_once "_header.php"; ?>
    <div class="d-flex justify-content-center ">
        <div class="fil-ariane fil-ariane-voiture d-inline-block position-relative mx-auto">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 py-2">
                    <li class="breadcrumb-item"><a class="link-dark fw-bold link-offset-2" href="index.php">Accueil</a></li>
                    <li class="breadcrumb-item" aria-current="page"><a class="link-dark fw-bold link-offset-2" href="voitures-actuelles.php">Voitures de luxe</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Voiture</li>
                </ol>
            </nav>
        </div>
    </div>
    <main class="py-5">
        <div class="container-lg">
            <div class="row">
                <div class="col-8">
                    <div class="fs-5 pe-3">
                        <h1 class="display-6 mb-5">BMW Série 3 : L'Élégance Redéfinie, La Puissance Réinventée - Votre Voyage Vers l'Excellence Automobile</h1>
                        <p>
                            La BMW Série 3 est une voiture emblématique qui incarne l'alliance parfaite entre performance, élégance et technologie. Conçue par le constructeur allemand BMW, cette berline de luxe a su évoluer au fil des années pour rester à la pointe de l'innovation automobile. Arborant un design dynamique et sophistiqué, la Série 3 attire les regards avec sa calandre distinctive, ses lignes fluides et ses phares effilés.
                        </p>
                        <p>
                            À l'intérieur, l'habitacle raffiné de la BMW Série 3 offre un mélange harmonieux de matériaux haut de gamme et de technologies avancées. Les sièges ergonomiques procurent un confort optimal, tandis que les finitions soignées témoignent de l'attention portée aux détails. L'espace généreux à bord assure un voyage agréable pour le conducteur et les passagers, faisant de cette berline une option idéale pour des événements spéciaux tels que des mariages, des soirées VIP ou des déplacements professionnels de haut standing.
                        </p>
                        <p>
                            Sous le capot, la BMW Série 3 se distingue par ses performances remarquables. Propulsée par des moteurs puissants et économes en carburant, elle offre une expérience de conduite dynamique et réactive. Les technologies de pointe intégrées, telles que le système de navigation intuitif, l'assistance à la conduite et les fonctionnalités de connectivité avancées, ajoutent une touche de modernité à l'ensemble.
                        </p>
                        <p>
                            Que ce soit pour une location à des fins événementielles, pour un voyage d'affaires ou simplement pour savourer le plaisir de conduire une voiture de prestige, la BMW Série 3 se positionne comme un choix incontournable, alliant style, performance et luxe dans un ensemble captivant.
                        </p>
                    </div>
                    
                </div>
                <div class="col-4">
                    <div class="carousel-voiture position-relative">
                        <div id="carouselExampleIndicators" class="carousel slide h-100 ">
                            <div class="carousel-inner h-100 ">
                                <div class="carousel-item active">
                                    <img src="img\pexels-mike-bird-794435.jpg" class="d-block w-100" alt="bmw photo 1">
                                </div>
                                <div class="carousel-item">
                                    <img src="img\pexels-mike-bird-100653.jpg" class="d-block w-100" alt="BMW photo 2">
                                </div>
                                <div class="carousel-item">
                                    <img src="img\pexels-mike-bird-100656.jpg" class="d-block w-100" alt="BMW Photo 3">
                                </div>
                                <div class="carousel-item">
                                    <img src="img\pexels-mike-bird-100651.jpg" class="d-block w-100" alt="BMW Photo 4">
                                </div>
                                <div class="carousel-item">
                                    <img src="img\pexels-mike-bird-100655.jpg" class="d-block w-100" alt="BMW Photo 5">
                                </div>
                            </div>
                            <button class="carousel-control-prev h-100" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon fs-5" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next h-100 " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <form class="mt-5" action="">
                        <h2 class="mb-4">Réserver dés maintenant !</h2>
                        <div class="input-group  mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Nom</span>
                            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        <div class="input-group  mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Prénom</span>
                            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        <div class="input-group  mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Adresse</span>
                            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        <div class="input-group  mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Téléphone</span>
                            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        <div class="input-group  mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
                        </div>
                        
                        <div class="mb-3">
                            <textarea class="form-control"  placeholder="Message" required></textarea>
                        </div>
                        <div class="input-group  date mb-5" id="datepicker">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Date</span>
                            <input type="date" class="form-control" id="date"/>
                        </div>
                        <button class="btn btn-outline-dark w-50 d-block fw-bold  mx-auto" type="submit">Réserver</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
<?php require_once "_footer.php"; ?>