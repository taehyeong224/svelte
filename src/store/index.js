import {writable} from 'svelte/store'
import uuid from 'uuid/v4'
import {getCurrentTimestamp} from "../util";

const _hackathons = [
  {
    id: uuid(),
    title: '2/2 합시다',
    body: "블라블라블라블라블라블라블라블라블라블라",
    total: 10,
    currentTeamCount: 1,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuid(),
    title: '다음달 하실 분들',
    body: "블라블라블라블라블라블라블라블라",
    total: 10,
    currentTeamCount: 1,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp()
  },
  {
    id: uuid(),
    title: '모이자',
    body: "블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라",
    total: 10,
    currentTeamCount: 1,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp()
  }];

const createHackathons = () => {
  const hackathons = writable(_hackathons);
  const {subscribe, reset, update: _update} = hackathons;

  const add = ({title, body, total}) => {
    _update(hackathon => hackathon.concat({
      id: uuid(),
      title,
      body,
      total: Number(total),
      currentTeamCount: 1,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    }))
  };

  const remove = hackathon => {
    if (!hackathon) return;
    _update(hackathons => hackathons.filter(_hackathon => _hackathon.id !== hackathon.id))
  };

  const update = hackathon => {
    if (!hackathon) return;
    _update(hackathons =>
      hackathons.map(_hackathon => (_hackathon.id === hackathon.id ? hackathon : _hackathon)),
    )
  };

  const getOne = id => {
    return _hackathons.find(_hackathon => _hackathon.id === id);
  };
  return {subscribe, reset, add, remove, update, getOne}
};

export const hackathons = createHackathons();
