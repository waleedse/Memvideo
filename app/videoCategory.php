<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoCategory extends Model
{
    
    protected $table = 'video_categories';
    protected $fillable = [
        'video_id',
        'category_id',
        'created_at',
        'updated_at'
    ];
}
