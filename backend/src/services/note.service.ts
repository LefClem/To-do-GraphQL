import { Note } from "../entities/note";

export async function getNotes(): Promise<Note[]>{
    try {
        const notes = await Note.find();
        return notes;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getNoteById(id: number): Promise<Note | null>{
    try {
        const note = await Note.findOne({
            where: {
                idNote : id
            }
        })
        return note;
    } catch (error) {
        throw error;
    }
}

export async function createNote(noteData: {
    text: string,
    date: Date
}): Promise<Note>{
    try {
        const note = Note.create(noteData);
        return note.save();
    } catch (error) {
        throw error;
    }
}

export async function deleteNote(id: number): Promise<String>{
    try {
        const result = await Note.delete({ idNote: id});
        if(result.affected === 0){
            return "Cette note a déjà été supprimée"
        } else {
            return "Bien supprimé";
        }
        
    } catch (error) {
        throw error;
    }
}