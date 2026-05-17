import React, { useState, useEffect, useMemo } from 'react';

// Données initiales d'exemple
const INITIAL_CHANTS = [
  {
    id: '1',
    titre: 'Alléluia, Christ est ressuscité',
    categorie: 'Pâques',
    auteur: 'Communauté de l\'Emmanuel',
    paroles: `Alléluia, alléluia, alléluia !
Christ est ressuscité, alléluia !

Couplet 1:
La pierre est roulée, le tombeau est vide,
Christ est ressuscité, alléluia !
Les anges ont chanté la victoire du Christ,
Il est vivant pour toujours !

Alléluia, alléluia, alléluia !
Christ est ressuscité, alléluia !

Couplet 2:
Il a vaincu la mort, il nous donne la vie,
Christ est ressuscité, alléluia !
Chantons avec joie, proclamons sa gloire,
Il est vivant pour toujours !

Alléluia, alléluia, alléluia !
Christ est ressuscité, alléluia !`
  },
  {
    id: '2',
    titre: 'Notre Père',
    categorie: 'Prière',
    auteur: 'Traditionnel',
    paroles: `Notre Père, qui es aux cieux,
Que ton nom soit sanctifié,
Que ton règne vienne,
Que ta volonté soit faite sur la terre comme au ciel.

Donne-nous aujourd'hui notre pain de ce jour.
Pardonne-nous nos offenses,
Comme nous pardonnons aussi à ceux qui nous ont offensés.
Et ne nous laisse pas entrer en tentation,
Mais délivre-nous du Mal.

Amen.`
  },
  {
    id: '3',
    titre: 'Je vous salue Marie',
    categorie: 'Prière Mariale',
    auteur: 'Traditionnel',
    paroles: `Je vous salue Marie, pleine de grâce,
Le Seigneur est avec vous,
Vous êtes bénie entre toutes les femmes,
Et Jésus, le fruit de vos entrailles, est béni.

Sainte Marie, Mère de Dieu,
Priez pour nous, pauvres pécheurs,
Maintenant et à l'heure de notre mort.

Amen.`
  },
  {
    id: '4',
    titre: 'Gloire à Dieu',
    categorie: 'Ordinaire',
    auteur: 'Liturgie',
    paroles: `Gloire à Dieu au plus haut des cieux,
Et paix sur la terre aux hommes qu'il aime.

Nous te louons, nous te bénissons, nous t'adorons,
Nous te glorifions, nous te rendons grâce,
Pour ton immense gloire,
Seigneur Dieu, Roi du ciel,
Dieu le Père tout-puissant.

Seigneur, Fils unique, Jésus Christ,
Seigneur Dieu, Agneau de Dieu, le Fils du Père,
Toi qui enlèves le péché du monde,
Prends pitié de nous.
Toi qui enlèves le péché du monde,
Reçois notre prière.
Toi qui es assis à la droite du Père,
Prends pitié de nous.

Car toi seul es saint,
Toi seul es Seigneur,
Toi seul es le Très-Haut,
Jésus Christ, avec le Saint-Esprit
Dans la gloire de Dieu le Père.

Amen.`
  },
  {
    id: '5',
    titre: 'Agneau de Dieu',
    categorie: 'Ordinaire',
    auteur: 'Liturgie',
    paroles: `Agneau de Dieu, qui enlèves le péché du monde,
Prends pitié de nous.

Agneau de Dieu, qui enlèves le péché du monde,
Prends pitié de nous.

Agneau de Dieu, qui enlèves le péché du monde,
Donne-nous la paix.`
  }
];

const CATEGORIES = [
  'Tous',
  'Entrée',
  'Offertoire',
  'Communion',
  'Sortie',
  'Pâques',
  'Noël',
  'Avent',
  'Carême',
  'Pentecôte',
  'Prière',
  'Prière Mariale',
  'Ordinaire',
  'Psaume',
  'Alléluia',
  'Autre'
];

function AddChantModal({ onClose, onAdd, categories }) {
  const [formData, setFormData] = useState({
    titre: '',
    categorie: 'Autre',
    auteur: '',
    paroles: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titre || !formData.paroles) {
      alert('⚠️ Le titre et les paroles sont obligatoires');
      return;
    }
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1e3a5f]">➕ Ajouter un nouveau chant</h2>
          <button className="text-gray-500 hover:bg-gray-100 rounded p-2 text-2xl" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800">Titre *</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800">Catégorie</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition"
              value={formData.categorie}
              onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800">Auteur</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition"
              value={formData.auteur}
              onChange={(e) => setFormData({ ...formData, auteur: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800">Paroles *</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition min-h-[200px] resize-vertical"
              value={formData.paroles}
              onChange={(e) => setFormData({ ...formData, paroles: e.target.value })}
              required
              placeholder="Copiez les paroles complètes du chant ici..."
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button type="button" className="px-6 py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2d5a8f] transition" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="px-6 py-3 bg-[#059669] text-white rounded-lg font-semibold hover:bg-[#047857] transition">
              ✅ Ajouter le chant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [chants, setChants] = useState([]);
  const [selectedChants, setSelectedChants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [sortBy, setSortBy] = useState('titre');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState(null);

  // Charger les chants depuis le stockage partagé
  useEffect(() => {
    loadChants();
  }, []);

  const loadChants = async () => {
    try {
      setIsLoading(true);
      const result = await window.storage.get('chants-liturgiques', true);
      
      if (result && result.value) {
        const chantsData = JSON.parse(result.value);
        setChants(chantsData);
      } else {
        // Initialiser avec les chants d'exemple
        await window.storage.set('chants-liturgiques', JSON.stringify(INITIAL_CHANTS), true);
        setChants(INITIAL_CHANTS);
      }
      setLastSync(new Date());
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      // Si erreur (clé inexistante), initialiser
      try {
        await window.storage.set('chants-liturgiques', JSON.stringify(INITIAL_CHANTS), true);
        setChants(INITIAL_CHANTS);
        setLastSync(new Date());
      } catch (initError) {
        console.error('Erreur lors de l\'initialisation:', initError);
        alert('❌ Erreur de connexion. La base de données sera locale pour cette session.');
        setChants(INITIAL_CHANTS);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveChants = async (newChants) => {
    try {
      await window.storage.set('chants-liturgiques', JSON.stringify(newChants), true);
      setChants(newChants);
      setLastSync(new Date());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  // Filtrage et tri des chants
  const filteredChants = useMemo(() => {
    let filtered = chants;

    if (categoryFilter !== 'Tous') {
      filtered = filtered.filter(c => c.categorie === categoryFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.titre.toLowerCase().includes(term) ||
        c.auteur.toLowerCase().includes(term) ||
        c.categorie.toLowerCase().includes(term)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'titre') {
        return a.titre.localeCompare(b.titre);
      } else if (sortBy === 'categorie') {
        return a.categorie.localeCompare(b.categorie);
      } else if (sortBy === 'auteur') {
        return a.auteur.localeCompare(b.auteur);
      }
      return 0;
    });

    return filtered;
  }, [chants, searchTerm, categoryFilter, sortBy]);

  const handleToggleChant = (chantId) => {
    setSelectedChants(prev =>
      prev.includes(chantId)
        ? prev.filter(id => id !== chantId)
        : [...prev, chantId]
    );
  };

  const handleRemoveSelected = (chantId) => {
    setSelectedChants(prev => prev.filter(id => id !== chantId));
  };

  const handleAddChant = async (newChant) => {
    const chant = {
      ...newChant,
      id: Date.now().toString()
    };
    const updatedChants = [...chants, chant];
    await saveChants(updatedChants);
    setShowAddModal(false);
  };

  const handleDeleteChant = async (chantId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce chant ? Cette action est irréversible.')) {
      return;
    }
    const updatedChants = chants.filter(c => c.id !== chantId);
    await saveChants(updatedChants);
    setSelectedChants(prev => prev.filter(id => id !== chantId));
  };

  const handleRefresh = async () => {
    await loadChants();
  };

  const handleGeneratePPT = () => {
    if (selectedChants.length === 0) return;

    const chantsToAdd = selectedChants.map(id =>
      chants.find(c => c.id === id)
    ).filter(Boolean);

    // Créer un message pour générer le PPT
    const chantsList = chantsToAdd.map((c, i) => 
      `${i + 1}. ${c.titre} (${c.categorie})\n   Auteur: ${c.auteur}\n   Paroles:\n${c.paroles}\n`
    ).join('\n\n');

    const message = `Génère une présentation PowerPoint avec les chants suivants pour la Paroisse Notre-Dame du Ventoux.

Design liturgique avec :
- Couleurs : bleu profond (#1e3a5f) et or (#c9a961)
- Slide de titre avec "Chants Liturgiques" et "Paroisse Notre-Dame du Ventoux"
- Pour chaque chant : slide de titre du chant puis slides avec les paroles (12 lignes max par slide)
- Slide de fin avec "Merci - Que le Seigneur vous bénisse"

Chants à inclure :

${chantsList}

Crée le fichier PowerPoint maintenant.`;

    window.sendPrompt(message);
  };

  const selectedChantsData = selectedChants.map(id =>
    chants.find(c => c.id === id)
  ).filter(Boolean);

  const categories = useMemo(() => {
    const cats = new Set(chants.map(c => c.categorie));
    return ['Tous', ...Array.from(cats).sort()];
  }, [chants]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#1e3a5f] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1e3a5f] font-semibold">Chargement de la base de données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 p-8 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] rounded-2xl text-white shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">🎵 Gestionnaire de Chants Liturgiques</h1>
          <p className="text-lg opacity-95">Base de données partagée en ligne</p>
          <div className="mt-4 inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm">
            ☁️ Synchronisé • Accessible à toute l'équipe
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-[#1e3a5f]">{chants.length}</div>
            <div className="text-gray-600 text-sm mt-1">Chants disponibles</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-[#1e3a5f]">{selectedChants.length}</div>
            <div className="text-gray-600 text-sm mt-1">Chants sélectionnés</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-[#1e3a5f]">{categories.length - 1}</div>
            <div className="text-gray-600 text-sm mt-1">Catégories</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bibliothèque */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6 pb-3 border-b-2 border-[#c9a961]">
              📚 Bibliothèque de Chants
            </h2>

            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                className="flex-1 min-w-[200px] px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition"
                placeholder="🔍 Rechercher un chant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition bg-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1e3a5f] focus:outline-none transition bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="titre">Trier par titre</option>
                <option value="categorie">Trier par catégorie</option>
                <option value="auteur">Trier par auteur</option>
              </select>
              <button
                className="px-4 py-2 bg-[#c9a961] text-[#1e3a5f] rounded-lg font-semibold hover:bg-[#e8d4a0] transition shadow"
                onClick={() => setShowAddModal(true)}
              >
                ➕ Nouveau
              </button>
              <button
                className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2d5a8f] transition shadow"
                onClick={handleRefresh}
                title="Actualiser"
              >
                🔄
              </button>
            </div>

            {filteredChants.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">🎼</div>
                <p>Aucun chant trouvé</p>
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto border border-gray-200 rounded-lg">
                {filteredChants.map(chant => (
                  <div
                    key={chant.id}
                    className={`p-4 border-b border-gray-200 flex items-center gap-4 hover:bg-gray-50 transition ${
                      selectedChants.includes(chant.id) ? 'bg-blue-50 border-l-4 border-l-[#1e3a5f]' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer accent-[#1e3a5f]"
                      checked={selectedChants.includes(chant.id)}
                      onChange={() => handleToggleChant(chant.id)}
                    />
                    <div className="flex-1 cursor-pointer" onClick={() => handleToggleChant(chant.id)}>
                      <div className="font-semibold text-[#1e3a5f]">{chant.titre}</div>
                      <div className="text-sm text-gray-600">
                        <span className="inline-block px-3 py-1 bg-[#e8d4a0] text-[#1e3a5f] rounded-full text-xs font-semibold mr-2">
                          {chant.categorie}
                        </span>
                        {chant.auteur}
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:bg-red-50 rounded p-2 transition text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChant(chant.id);
                      }}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panneau de sélection */}
          <div className="lg:sticky lg:top-8 h-fit bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6 pb-3 border-b-2 border-[#c9a961]">
              ✅ Sélection
            </h2>

            <div className="bg-[#e8d4a0] text-[#1e3a5f] p-4 rounded-lg text-center font-semibold mb-4">
              {selectedChants.length} {selectedChants.length > 1 ? 'chants sélectionnés' : 'chant sélectionné'}
            </div>

            {selectedChantsData.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto mb-4 border border-gray-200 rounded-lg">
                {selectedChantsData.map((chant, index) => (
                  <div key={chant.id} className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <strong>{index + 1}.</strong> {chant.titre}
                    </div>
                    <button
                      className="text-red-500 hover:bg-red-50 rounded p-1 transition text-xl"
                      onClick={() => handleRemoveSelected(chant.id)}
                      title="Retirer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className="w-full px-6 py-4 bg-[#059669] text-white rounded-lg font-semibold hover:bg-[#047857] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              onClick={handleGeneratePPT}
              disabled={selectedChants.length === 0 || isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Génération...
                </>
              ) : (
                <>📊 Générer le PowerPoint</>
              )}
            </button>

            {selectedChants.length > 0 && (
              <button
                className="w-full px-6 py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2d5a8f] transition shadow"
                onClick={() => setSelectedChants([])}
              >
                🗑️ Tout désélectionner
              </button>
            )}
          </div>
        </div>

        {/* Sync Indicator */}
        {lastSync && (
          <div className="fixed bottom-8 right-8 bg-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-[#059669] rounded-full animate-pulse"></div>
            Dernière synchro : {lastSync.toLocaleTimeString('fr-FR')}
          </div>
        )}

        {/* Modal */}
        {showAddModal && (
          <AddChantModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddChant}
            categories={CATEGORIES.filter(c => c !== 'Tous')}
          />
        )}
      </div>
    </div>
  );
}
