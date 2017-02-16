from mingus.midi import midi_file_out
from mingus.containers import NoteContainer
from mingus.containers import Note

filename = 'frontend/testout.mid'
score = 0.15


if score > .875:
  octave = 7
elif score > .75:
  octave = 6
elif score > .625:
  octave = 5
elif score > .50:
  octave = 4
elif score > .375:
  octave = 3
elif score > .25:
  octave = 2 
elif score > .125:
  octave = 1
else:
  octave = 0
  
if(octave>3):
  nc = NoteContainer([Note('C',octave,{'volume':10}),Note('E',octave,{'volume':10}),Note('G',octave,{'volume':10})])
else:
  nc = NoteContainer([Note('C',octave,{'volume':10}),Note('Eb',octave,{'volume':10}),Note('G',octave,{'volume':10})])
  
midi_file_out.write_NoteContainer(filename,nc,40)
