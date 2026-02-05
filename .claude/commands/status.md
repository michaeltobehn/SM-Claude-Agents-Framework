Lies docs/CONTINUITY.md.

## Aufgabe

Fasse den aktuellen Projekt-Status zusammen:

1. **Aktuelle Phase** - Welche Phase ist aktiv?
2. **Offene Tasks** - Was muss noch gemacht werden?
3. **Letzte Ergebnisse** - Was haben die Agents zuletzt gemacht?
4. **Blocker** - Gibt es Hindernisse?
5. **Nächster Schritt** - Welcher Task kommt als nächstes?

$ARGUMENTS

## Erwartetes Format

```
## Projekt Status

**Phase:** X - Name
**Fortschritt:** X/Y Tasks abgeschlossen

### Offene Tasks
- [ ] Task 1
- [ ] Task 2

### Letzte Agent-Ergebnisse
- BUILDER: ...
- TESTER: ...

### Nächster Schritt
Empfehlung welcher Agent mit welchem Task starten soll.
```

## Bei leerem $ARGUMENTS

Zeige nur den Status. Bei Argument wie "start phase 1" oder "next task",
schlage den passenden Agent-Aufruf vor.
