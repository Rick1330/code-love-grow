
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrackerEntry } from "@/services/api";
import { Slider } from "@/components/ui/slider";
import { PlusCircle } from "lucide-react";

interface LogProgressDialogProps {
  onSubmit: (data: TrackerEntry) => Promise<boolean>;
}

const LogProgressDialog = ({ onSubmit }: LogProgressDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TrackerEntry>({
    date: new Date(),
    hours: 1,
    mood: 3,
    notes: "",
    languages: [{ name: "JavaScript", hours: 1 }]
  });
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLanguageChange = (index: number, field: string, value: any) => {
    const updatedLanguages = [...(formData.languages || [])];
    updatedLanguages[index] = { 
      ...updatedLanguages[index], 
      [field]: value 
    };
    
    setFormData(prev => ({ ...prev, languages: updatedLanguages }));
  };
  
  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), { name: "", hours: 0 }]
    }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Validate total hours match language hours
    const languageHours = formData.languages?.reduce((sum, lang) => sum + lang.hours, 0) || 0;
    const updatedFormData = {
      ...formData,
      hours: languageHours > 0 ? languageHours : formData.hours
    };
    
    const success = await onSubmit(updatedFormData);
    
    setIsSubmitting(false);
    if (success) {
      setIsOpen(false);
      // Reset form
      setFormData({
        date: new Date(),
        hours: 1,
        mood: 3,
        notes: "",
        languages: [{ name: "JavaScript", hours: 1 }]
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full">
          <PlusCircle className="w-5 h-5 mr-2" />
          Log Today's Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Your Coding Progress</DialogTitle>
          <DialogDescription>
            Track your coding hours, mood, and what you worked on today.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="hours">Total Hours Coded</Label>
            <Input
              id="hours"
              type="number"
              min="0.1"
              step="0.1"
              value={formData.hours}
              onChange={e => handleChange('hours', parseFloat(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Mood (1-5)</Label>
            <div className="flex items-center gap-2">
              <span>😢</span>
              <Slider
                value={[formData.mood]}
                min={1}
                max={5}
                step={1}
                onValueChange={values => handleChange('mood', values[0])}
                className="flex-1"
              />
              <span>😃</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Languages & Tools</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addLanguage}
                className="h-8 text-xs"
              >
                Add
              </Button>
            </div>
            
            {formData.languages?.map((lang, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input 
                  placeholder="Language"
                  value={lang.name}
                  onChange={e => handleLanguageChange(index, 'name', e.target.value)}
                  className="col-span-2"
                />
                <Input 
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="Hours"
                  value={lang.hours}
                  onChange={e => handleLanguageChange(index, 'hours', parseFloat(e.target.value))}
                />
              </div>
            ))}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="What did you work on today?"
              value={formData.notes}
              onChange={e => handleChange('notes', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-lovable-purple hover:bg-lovable-purple-dark"
          >
            {isSubmitting ? "Saving..." : "Save Progress"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogProgressDialog;
