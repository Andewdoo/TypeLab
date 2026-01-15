import './modes.css'
import { WORD_LIST } from './wordList.js'

function randomWords(count) {
	const words = []
	for (let i = 0; i < count; i++) {
		words.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)])
	}
	return words.join(' ') + '.'
}

export function generateSample(gameMode) {
	switch (gameMode) {
		case 'poems':
			return randomWords(80)
		case 'songs':
			return randomWords(90)
		case 'words':
			return randomWords(120)
		case 'paragraphs':
			return randomWords(100)
		default:
			return randomWords(100)
	}
}

export function ModeSelector({ gameMode, onChange }) {
	return (
		<div className="mode-controls" role="toolbar" aria-label="Game mode">
			<button className={`seg ${gameMode === 'poems' ? 'active' : ''}`} onClick={() => onChange('poems')} type="button">Poems</button>
			<button className={`seg ${gameMode === 'songs' ? 'active' : ''}`} onClick={() => onChange('songs')} type="button">Songs</button>
			<button className={`seg ${gameMode === 'words' ? 'active' : ''}`} onClick={() => onChange('words')} type="button">Words</button>
			<button className={`seg ${gameMode === 'paragraphs' ? 'active' : ''}`} onClick={() => onChange('paragraphs')} type="button">Paragraphs</button>
		</div>
	)
}

