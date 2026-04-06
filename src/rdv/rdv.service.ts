import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rdv, RdvDocument } from './schemas/rdv.schema';

@Injectable()
export class RdvService {
  constructor(@InjectModel(Rdv.name) private rdvModel: Model<RdvDocument>) {}

  async create(
    userId: string,
    prestation: string,
    date: string,
    prix: string,
  ): Promise<RdvDocument> {
    const rdv = new this.rdvModel({ userId, prestation, date, prix });
    return rdv.save();
  }

  async findByUser(userId: string): Promise<RdvDocument[]> {
    return this.rdvModel.find({ userId }).sort({ createdAt: -1 });
  }

  async updateStatut(
    rdvId: string,
    statut: string,
  ): Promise<RdvDocument | null> {
    return this.rdvModel.findByIdAndUpdate(rdvId, { statut }, { new: true });
  }

  async delete(rdvId: string): Promise<RdvDocument | null> {
    return this.rdvModel.findByIdAndDelete(rdvId);
  }
}
