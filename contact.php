<?php require_once "_head.php"; ?>
<body>
    <?php require_once "_header.php"; ?>
    <div class="d-flex justify-content-center ">
        <div class="fil-ariane d-inline-block position-relative mx-auto">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 py-2">
                    <li class="breadcrumb-item"><a class="link-dark link-offset-2 fw-bold " href="index.php">Accueil</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Contact</li>
                </ol>
            </nav>
        </div>
    </div>
    <main class="my-5">
        <div class="container-md">
            <h1 class="my-5">Nous contacter</h1>
            <div class="row mb-5 ">
                <div class="col-12 col-md-8">
                    <form class="row">
                        <div class="col-12">
                            <label for="validationServer01" class="form-label">Nom :</label>
                            <input type="text" class="form-control mb-5" id="validationServer01" required>
                        </div>
                        <div class="col-12">
                            <label for="validationServer02" class="form-label">Prénom :</label>
                            <input type="text" class="form-control mb-5" id="validationServer02" required>
                        </div>
                        <div class="col-12">
                            <label for="validationServerUsername" class="form-label">Adresse Mail :</label>
                            <div class="input-group has-validation mb-5">
                                <span class="input-group-text" id="inputGroupPrepend3">@</span>
                                <input type="text" class="form-control" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="validationTextarea" class="form-label">Message</label>
                            <textarea class="form-control mb-5" id="validationTextarea" required></textarea>
                        </div>
                        <div class="col-md-6">
                            <div class="form-check mb-5 d-flex justify-content-center">
                                <input class="form-check-input " type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required>
                                <label class="form-check-label" for="invalidCheck3">
                                    Accepter d'être recontacter
                                </label>
                                <div id="invalidCheck3Feedback">
                                    Vous devez être d'accord avant de soumettre.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <button type="submit" class="d-block w-50 btn btn-outline-dark fw-bold fs-4 border border-dark mx-auto border-3 "> Envoyer</button>
                        </div>
                    </form>
                </div>
                <div class="col-12 col-md-4">
                    <div class="row ps-5 ">
                        <div class="col-12 my-5">
                            <h5 class="mb-0">Navigation</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Accueil</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Voitures Actuelles</a></li>
                                <li class="nav-item "><a href="#" class="nav-link p-0 text-muted">Voitures de Collection</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Actualités</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Contact</a></li>
                            </ul>
                        </div>
                        <div class="col-12 mb-5">
                            <h5 class="mb-0">Mentions légales</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Politique de confidentialité</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Conditions générales de vente</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Conditions générales d'utilisation</a></li>
                                <li class="nav-item"><a href="#" class="nav-link p-0 text-muted">Proprieté intellectuelle</a></li>
                            </ul>
                        </div>
                        <div class="col-12 mb-5">
                            <h5 class="mb-0">Adresse de l'agence</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">Super Loc Company</li>
                                <li class="nav-item">146 rue des hortensias</li>
                                <li class="nav-item">59 160</li>
                                <li class="nav-item">LILLE</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h5 class="mb-0 mt-5 ">Comment venir ?</h5>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2529.758753378802!2d2.9881694999999993!3d50.6501714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dcd533fd681a2f%3A0xadf1e05d1c02f631!2sPUB%20GOUDALE%20RESTAURANT!5e0!3m2!1sfr!2sfr!4v1705164697561!5m2!1sfr!2sfr" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </main>
<?php require_once "_footer.php"; ?>