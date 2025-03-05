import React, { useEffect, useRef } from "react";
// Utiliser un chemin relatif pour l'import CSS
import '/src/css/history.css';

// HTML intégré directement dans le composant
const historyHTML = `
<section id="history" class="history_section">
    <div class="text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-hiphop-orange mb-6">
            Notre Histoire
        </h2>
        <div class="w-24 h-1 bg-hiphop-orange mx-auto"></div>
    </div>
   
    <div class="histoirebody">
        <div class="containerhistory">
            <div class="clip clip1">
                <div class="section-word">CULTURE</div>
                <div class="content">
                    <h2 class="history_h2">CULTURE</h2>
                    <p class="history_p">
                        Depuis sa création, cette culture universelle et sans frontières a profondément influencé le monde.
                        Elle résonne en chacun de nous, quelle que soit la manière dont nous l'exprimons. Aujourd'hui, le HipHop
                        ne cesse de s'ouvrir, d'évoluer et d'embrasser de nouveaux styles et pratiques.
                    </p>
                </div>
            </div>
            <div class="clip clip2">
                <div class="section-word">MY HIPHOP</div>
                <div class="content">
                    <h2 class="history_h2">MY HIPHOP</h2>
                    <p class="history_p">
                        L'événement <strong>WHERE'S MY HIPHOP</strong> célèbre une culture riche et diversifiée.
                        Il met à l'honneur les valeurs fondamentales du HipHop : partage, transmission et respect, à travers des activités variées.
                    </p>

                </div>
            </div>
            <div class="clip clip3">
                <div class="section-word">FONDEMENTS</div>
                <div class="content">
                    <h2 class="history_h2" >FONDEMENTS</h2>
                    <p class="history_p">
                        Un point d'honneur sera accordé à l'inclusivité, ainsi qu'à la mixité, dans le sens où les intervenants représenteront l'ouverture fondamentale du HipHop sur la féminité, le handicap, l'âge ou la couleur de peau.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
`;

const History = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            // Injecter le HTML
            containerRef.current.innerHTML = historyHTML;

            // Fonction pour initialiser l'interactivité
            const initializeClips = () => {
                // Sélectionner tous les clips
                const clips = containerRef.current.querySelectorAll('.clip');

                // Ajouter un écouteur d'événements pour chaque clip
                clips.forEach(clip => {
                    clip.addEventListener('click', function() {
                        // Si le clip cliqué est déjà actif
                        if (this.classList.contains('active')) {
                            // Retirer la classe active
                            this.classList.remove('active');
                        } else {
                            // Retirer la classe active de tous les clips
                            clips.forEach(c => c.classList.remove('active'));
                            // Ajouter la classe active au clip cliqué
                            this.classList.add('active');
                        }
                    });
                });
            };

            // Initialiser les clips
            initializeClips();

            // Fonction de nettoyage pour le démontage du composant
            return () => {
                // Ici, vous pourriez ajouter du code pour nettoyer les écouteurs d'événements
                // si nécessaire lors du démontage du composant
                const clips = containerRef.current?.querySelectorAll('.clip');
                if (clips) {
                    clips.forEach(clip => {
                        clip.replaceWith(clip.cloneNode(true));
                    });
                }
            };
        }
    }, []);

    return <div ref={containerRef} />;
};

export default History;